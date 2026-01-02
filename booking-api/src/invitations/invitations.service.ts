/**
 * Invitations Service
 * 
 * Service untuk mengelola invitation/undangan main bareng.
 * Support PUBLIC (bisa dicari) dan PRIVATE (hanya via link).
 */

import {
    Injectable,
    NotFoundException,
    BadRequestException,
    ForbiddenException,
} from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { NotificationsService } from '../notifications/notifications.service';
import { BookingStatus, InviteType, PaymentStatus } from '@prisma/client';
import { v4 as uuidv4 } from 'uuid';

@Injectable()
export class InvitationsService {
    constructor(
        private prisma: PrismaService,
        private notifications: NotificationsService,
    ) { }

    /**
     * Generate unique invite code
     */
    private generateInviteCode(): string {
        // Generate 8 character alphanumeric code
        return uuidv4().substring(0, 8).toUpperCase();
    }

    /**
     * Browse public invitations (open joinan)
     */
    async browsePublic(params: {
        city?: string;
        venueType?: string;
        date?: Date;
        skip?: number;
        take?: number;
    }) {
        const { city, venueType, date, skip = 0, take = 20 } = params;

        const today = new Date();
        today.setHours(0, 0, 0, 0);

        const where: any = {
            status: BookingStatus.OPEN,
            inviteType: InviteType.PUBLIC,
            isJoinable: true,
            date: { gte: date || today },
        };

        if (city || venueType) {
            where.venue = {};
            if (city) where.venue.city = city;
            if (venueType) where.venue.venueType = venueType;
        }

        const [invitations, total] = await Promise.all([
            this.prisma.booking.findMany({
                where,
                skip,
                take,
                orderBy: { date: 'asc' },
                include: {
                    venue: {
                        select: {
                            id: true,
                            name: true,
                            address: true,
                            city: true,
                            venueType: true,
                            images: true,
                            pricePerHour: true,
                        },
                    },
                    owner: {
                        select: { id: true, name: true, avatar: true },
                    },
                    participants: {
                        select: { id: true, userId: true },
                    },
                },
            }),
            this.prisma.booking.count({ where }),
        ]);

        // Add available slots info
        const data = invitations.map((inv) => ({
            ...inv,
            filledSlots: inv.participants.length,
            availableSlots: inv.maxSlots - inv.participants.length,
        }));

        return {
            data,
            meta: { total, skip, take, hasMore: skip + take < total },
        };
    }

    /**
     * Get invitation by code (for private invites)
     */
    async getByCode(inviteCode: string) {
        const booking = await this.prisma.booking.findUnique({
            where: { inviteCode },
            include: {
                venue: {
                    select: {
                        id: true,
                        name: true,
                        address: true,
                        city: true,
                        venueType: true,
                        images: true,
                        facilities: true,
                        pricePerHour: true,
                    },
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
        });

        if (!booking) {
            throw new NotFoundException('Undangan tidak ditemukan');
        }

        return {
            ...booking,
            filledSlots: booking.participants.length,
            availableSlots: booking.maxSlots - booking.participants.length,
        };
    }

    /**
     * Join via invite code
     */
    async joinByCode(inviteCode: string, userId: string) {
        const booking = await this.prisma.booking.findUnique({
            where: { inviteCode },
            include: {
                participants: true,
                owner: { select: { name: true } },
                venue: { select: { name: true } },
            },
        });

        if (!booking) {
            throw new NotFoundException('Undangan tidak ditemukan');
        }

        // Validations
        if (booking.status !== BookingStatus.OPEN) {
            throw new BadRequestException('Undangan sudah tidak tersedia');
        }

        if (!booking.isJoinable) {
            throw new BadRequestException('Booking ini tidak bisa di-join');
        }

        if (booking.participants.length >= booking.maxSlots) {
            throw new BadRequestException('Slot sudah penuh');
        }

        if (booking.joinDeadline && new Date() > booking.joinDeadline) {
            throw new BadRequestException('Deadline join sudah lewat');
        }

        // Check if already joined
        const alreadyJoined = booking.participants.some((p) => p.userId === userId);
        if (alreadyJoined) {
            throw new BadRequestException('Anda sudah bergabung di undangan ini');
        }

        // Get user name for notification
        const user = await this.prisma.user.findUnique({
            where: { id: userId },
            select: { name: true },
        });

        // Add participant
        await this.prisma.bookingParticipant.create({
            data: {
                bookingId: booking.id,
                userId,
                shareAmount: booking.pricePerSlot,
                isOwner: false,
                paymentStatus: PaymentStatus.UNPAID,
            },
        });

        // Notify owner
        await this.notifications.notifyJoinanJoined(booking.id, user?.name || 'Seseorang');

        return {
            message: `Berhasil bergabung di "${booking.title || 'Main Bareng'}"`,
            booking: await this.getByCode(inviteCode),
        };
    }

    /**
     * Generate new invite link (regenerate code)
     */
    async regenerateInviteCode(bookingId: string, userId: string) {
        const booking = await this.prisma.booking.findUnique({
            where: { id: bookingId },
        });

        if (!booking) {
            throw new NotFoundException('Booking tidak ditemukan');
        }

        if (booking.ownerId !== userId) {
            throw new ForbiddenException('Hanya owner yang bisa regenerate invite link');
        }

        const newCode = this.generateInviteCode();

        await this.prisma.booking.update({
            where: { id: bookingId },
            data: { inviteCode: newCode },
        });

        return {
            inviteCode: newCode,
            inviteLink: `https://kumpulmain.id/join/${newCode}`,
        };
    }

    /**
     * Toggle invite type (PUBLIC/PRIVATE)
     */
    async toggleInviteType(bookingId: string, userId: string, inviteType: InviteType) {
        const booking = await this.prisma.booking.findUnique({
            where: { id: bookingId },
        });

        if (!booking) {
            throw new NotFoundException('Booking tidak ditemukan');
        }

        if (booking.ownerId !== userId) {
            throw new ForbiddenException('Hanya owner yang bisa mengubah tipe undangan');
        }

        await this.prisma.booking.update({
            where: { id: bookingId },
            data: { inviteType },
        });

        return {
            message: `Undangan diubah ke ${inviteType === InviteType.PUBLIC ? 'PUBLIC' : 'PRIVATE'}`,
            inviteType,
        };
    }
}
