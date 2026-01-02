/**
 * Bookings Service - KumpulMain.id
 * 
 * Service untuk mengelola bookings dengan fitur joinan (main bareng).
 * 
 * Flow Joinan:
 * 1. Owner membuat booking dengan isJoinable=true dan maxSlots
 * 2. Owner ditambahkan sebagai participant pertama
 * 3. User lain bisa join (via browse public atau invite link)
 * 4. Setiap participant bayar shareAmount (totalPrice / maxSlots)
 * 5. Setelah semua participant bayar, status jadi CONFIRMED
 */

import {
    Injectable,
    NotFoundException,
    BadRequestException,
    ForbiddenException,
} from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateBookingDto } from './dto';
import { BookingStatus, PaymentStatus, InviteType } from '@prisma/client';
import { v4 as uuidv4 } from 'uuid';

@Injectable()
export class BookingsService {
    constructor(private prisma: PrismaService) { }

    /**
     * Generate unique invite code
     */
    private generateInviteCode(): string {
        return uuidv4().substring(0, 8).toUpperCase();
    }

    /**
     * Create booking baru
     */
    async create(dto: CreateBookingDto, userId: string) {
        // Get venue
        const venue = await this.prisma.venue.findUnique({
            where: { id: dto.venueId },
        });

        if (!venue || !venue.isActive) {
            throw new NotFoundException('Venue tidak ditemukan');
        }

        // Parse times
        const date = new Date(dto.date);
        const [startHour] = dto.startTime.split(':').map(Number);
        const [endHour] = dto.endTime.split(':').map(Number);

        // Validate time range
        if (startHour >= endHour) {
            throw new BadRequestException('Waktu selesai harus lebih dari waktu mulai');
        }

        // Calculate duration in hours
        const durationHours = endHour - startHour;

        // Calculate total price
        const totalPrice = venue.pricePerHour * durationHours;

        // Check for conflicting bookings (simple string comparison for HH:mm)
        const conflictingBooking = await this.prisma.booking.findFirst({
            where: {
                venueId: dto.venueId,
                date: date,
                status: { notIn: [BookingStatus.CANCELLED] },
                OR: [
                    {
                        AND: [
                            { startTime: { lte: dto.startTime } },
                            { endTime: { gt: dto.startTime } },
                        ],
                    },
                    {
                        AND: [
                            { startTime: { lt: dto.endTime } },
                            { endTime: { gte: dto.endTime } },
                        ],
                    },
                    {
                        AND: [
                            { startTime: { gte: dto.startTime } },
                            { endTime: { lte: dto.endTime } },
                        ],
                    },
                ],
            },
        });

        if (conflictingBooking) {
            throw new BadRequestException('Slot waktu sudah terbooking');
        }

        // Determine initial status and price per slot
        const maxSlots = dto.isJoinable ? (dto.maxSlots || 2) : 1;
        const pricePerSlot = Math.ceil(totalPrice / maxSlots);
        const initialStatus = dto.isJoinable ? BookingStatus.OPEN : BookingStatus.PENDING;
        const inviteCode = this.generateInviteCode();

        // Create booking with transaction
        const booking = await this.prisma.$transaction(async (tx) => {
            // Create booking
            const newBooking = await tx.booking.create({
                data: {
                    venueId: dto.venueId,
                    ownerId: userId,
                    date: date,
                    startTime: dto.startTime,
                    endTime: dto.endTime,
                    totalPrice,
                    pricePerSlot,
                    maxSlots,
                    isJoinable: dto.isJoinable || false,
                    inviteType: dto.inviteType as InviteType || InviteType.PUBLIC,
                    inviteCode,
                    title: dto.title || 'Main Bareng',
                    joinDeadline: dto.joinDeadline ? new Date(dto.joinDeadline) : null,
                    status: initialStatus,
                    notes: dto.notes,
                },
            });

            // Add owner as first participant
            await tx.bookingParticipant.create({
                data: {
                    bookingId: newBooking.id,
                    userId: userId,
                    shareAmount: pricePerSlot,
                    isOwner: true,
                    paymentStatus: PaymentStatus.UNPAID,
                },
            });

            // Create chat room for this booking
            await tx.chatRoom.create({
                data: {
                    bookingId: newBooking.id,
                },
            });

            return newBooking;
        });

        return {
            message: 'Booking berhasil dibuat',
            booking: await this.findOne(booking.id),
            inviteCode,
            inviteLink: `https://kumpulmain.id/join/${inviteCode}`,
        };
    }

    /**
     * Join ke booking yang sudah ada
     */
    async joinBooking(bookingId: string, userId: string) {
        const booking = await this.prisma.booking.findUnique({
            where: { id: bookingId },
            include: {
                participants: true,
            },
        });

        if (!booking) {
            throw new NotFoundException('Booking tidak ditemukan');
        }

        // Validate join conditions
        if (!booking.isJoinable) {
            throw new BadRequestException('Booking ini tidak bisa di-join');
        }

        if (booking.status !== BookingStatus.OPEN) {
            throw new BadRequestException('Booking tidak dalam status OPEN');
        }

        if (booking.participants.length >= booking.maxSlots) {
            throw new BadRequestException('Slot sudah penuh');
        }

        if (booking.joinDeadline && new Date() > booking.joinDeadline) {
            throw new BadRequestException('Deadline join sudah lewat');
        }

        // Check if user already joined
        const alreadyJoined = booking.participants.some((p) => p.userId === userId);
        if (alreadyJoined) {
            throw new BadRequestException('Anda sudah join booking ini');
        }

        // Add participant
        await this.prisma.bookingParticipant.create({
            data: {
                bookingId: bookingId,
                userId: userId,
                shareAmount: booking.pricePerSlot,
                isOwner: false,
                paymentStatus: PaymentStatus.UNPAID,
            },
        });

        return {
            message: 'Berhasil join booking',
            booking: await this.findOne(bookingId),
        };
    }

    /**
     * Leave booking (untuk non-owner yang belum bayar)
     */
    async leaveBooking(bookingId: string, userId: string) {
        const participant = await this.prisma.bookingParticipant.findUnique({
            where: {
                bookingId_userId: {
                    bookingId,
                    userId,
                },
            },
        });

        if (!participant) {
            throw new NotFoundException('Anda bukan peserta booking ini');
        }

        if (participant.isOwner) {
            throw new ForbiddenException('Owner tidak bisa leave, gunakan cancel booking');
        }

        if (participant.paymentStatus === PaymentStatus.PAID) {
            throw new BadRequestException('Tidak bisa leave setelah bayar, hubungi admin untuk refund');
        }

        await this.prisma.bookingParticipant.delete({
            where: { id: participant.id },
        });

        return {
            message: 'Berhasil keluar dari booking',
        };
    }

    /**
     * Get semua bookings yang bisa di-join (OPEN status, PUBLIC)
     */
    async findOpenBookings(params: {
        skip?: number;
        take?: number;
        venueId?: string;
        date?: Date;
    }) {
        const { skip = 0, take = 10, venueId, date } = params;

        const today = new Date();
        today.setHours(0, 0, 0, 0);

        const where: any = {
            status: BookingStatus.OPEN,
            isJoinable: true,
            inviteType: InviteType.PUBLIC,
            date: { gte: date || today },
        };

        if (venueId) where.venueId = venueId;

        const [bookings, total] = await Promise.all([
            this.prisma.booking.findMany({
                where,
                skip,
                take,
                orderBy: { date: 'asc' },
                include: {
                    venue: {
                        select: { id: true, name: true, address: true, pricePerHour: true, images: true },
                    },
                    owner: {
                        select: { id: true, name: true, avatar: true },
                    },
                    participants: {
                        include: {
                            user: { select: { id: true, name: true, avatar: true } },
                        },
                    },
                },
            }),
            this.prisma.booking.count({ where }),
        ]);

        // Add available slots info
        const data = bookings.map((b) => ({
            ...b,
            filledSlots: b.participants.length,
            availableSlots: b.maxSlots - b.participants.length,
        }));

        return {
            data,
            meta: {
                total,
                skip,
                take,
                hasMore: skip + take < total,
            },
        };
    }

    /**
     * Get bookings milik user (sebagai owner atau participant)
     */
    async findMyBookings(userId: string, status?: BookingStatus) {
        const where: any = {
            OR: [
                { ownerId: userId },
                { participants: { some: { userId } } },
            ],
        };

        if (status) where.status = status;

        const bookings = await this.prisma.booking.findMany({
            where,
            orderBy: { date: 'desc' },
            include: {
                venue: {
                    select: { id: true, name: true, address: true, images: true },
                },
                participants: {
                    include: {
                        user: { select: { id: true, name: true, avatar: true } },
                    },
                },
                chatRoom: {
                    select: { id: true },
                },
            },
        });

        return bookings.map(b => ({
            ...b,
            filledSlots: b.participants.length,
            availableSlots: b.maxSlots - b.participants.length,
        }));
    }

    /**
     * Get booking by ID
     */
    async findOne(id: string) {
        const booking = await this.prisma.booking.findUnique({
            where: { id },
            include: {
                venue: true,
                owner: {
                    select: { id: true, name: true, email: true, avatar: true },
                },
                participants: {
                    include: {
                        user: { select: { id: true, name: true, email: true, avatar: true } },
                        payment: true,
                    },
                },
                chatRoom: {
                    select: { id: true },
                },
            },
        });

        if (!booking) {
            throw new NotFoundException('Booking tidak ditemukan');
        }

        return {
            ...booking,
            filledSlots: booking.participants.length,
            availableSlots: booking.maxSlots - booking.participants.length,
        };
    }

    /**
     * Cancel booking (owner only)
     */
    async cancelBooking(bookingId: string, userId: string) {
        const booking = await this.prisma.booking.findUnique({
            where: { id: bookingId },
            include: { participants: true },
        });

        if (!booking) {
            throw new NotFoundException('Booking tidak ditemukan');
        }

        if (booking.ownerId !== userId) {
            throw new ForbiddenException('Hanya owner yang bisa cancel booking');
        }

        // Check if any participant has paid
        const hasPaidParticipant = booking.participants.some(
            (p) => p.paymentStatus === PaymentStatus.PAID
        );

        if (hasPaidParticipant) {
            throw new BadRequestException(
                'Tidak bisa cancel karena ada peserta yang sudah bayar. Hubungi admin untuk refund.'
            );
        }

        await this.prisma.booking.update({
            where: { id: bookingId },
            data: { status: BookingStatus.CANCELLED },
        });

        return {
            message: 'Booking berhasil dibatalkan',
        };
    }

    /**
     * Check and update booking status
     * Called after payment completed
     */
    async checkAndUpdateStatus(bookingId: string) {
        const booking = await this.prisma.booking.findUnique({
            where: { id: bookingId },
            include: { participants: true },
        });

        if (!booking) return;

        // For non-joinable booking: if owner paid, confirm
        if (!booking.isJoinable) {
            const ownerPaid = booking.participants.some(
                (p) => p.isOwner && p.paymentStatus === PaymentStatus.PAID
            );
            if (ownerPaid) {
                await this.prisma.booking.update({
                    where: { id: bookingId },
                    data: { status: BookingStatus.CONFIRMED },
                });
            }
            return;
        }

        // For joinable booking: check if all slots filled and paid
        const allSlotsFilled = booking.participants.length >= booking.maxSlots;
        const allPaid = booking.participants.every(
            (p) => p.paymentStatus === PaymentStatus.PAID
        );

        if (allSlotsFilled && allPaid) {
            await this.prisma.booking.update({
                where: { id: bookingId },
                data: { status: BookingStatus.CONFIRMED },
            });
        }
    }
}
