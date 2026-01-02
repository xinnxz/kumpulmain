/**
 * Pengelola Service
 * 
 * Service untuk venue managers (pengelola).
 * Mengelola venue, schedule, dan melihat bookings.
 */

import {
    Injectable,
    NotFoundException,
    ForbiddenException,
    BadRequestException,
} from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { Role } from '@prisma/client';

// DTOs
interface CreateVenueDto {
    name: string;
    description?: string;
    address: string;
    city?: string;
    pricePerHour: number;
    capacity: number;
    images?: string[];
    facilities?: string[];
    venueType?: string;
}

interface UpdateScheduleDto {
    schedules: {
        dayOfWeek: number;
        openTime: string;
        closeTime: string;
        isAvailable: boolean;
    }[];
}

interface BlockDateDto {
    date: string;
    reason?: string;
}

@Injectable()
export class PengelolaService {
    constructor(private prisma: PrismaService) { }

    /**
     * Get dashboard stats untuk pengelola
     */
    async getDashboard(managerId: string) {
        const today = new Date();
        today.setHours(0, 0, 0, 0);

        const thisMonth = new Date(today.getFullYear(), today.getMonth(), 1);

        // Get all venues owned by this manager
        const venues = await this.prisma.venue.findMany({
            where: { managerId, isActive: true },
            select: { id: true, name: true },
        });

        const venueIds = venues.map(v => v.id);

        const [
            totalBookings,
            todayBookings,
            monthlyBookings,
            pendingBookings,
            monthlyRevenue,
            recentBookings,
        ] = await Promise.all([
            // Total bookings all time
            this.prisma.booking.count({
                where: { venueId: { in: venueIds } },
            }),

            // Today's bookings
            this.prisma.booking.count({
                where: {
                    venueId: { in: venueIds },
                    date: today,
                },
            }),

            // This month's bookings
            this.prisma.booking.count({
                where: {
                    venueId: { in: venueIds },
                    createdAt: { gte: thisMonth },
                },
            }),

            // Pending bookings
            this.prisma.booking.count({
                where: {
                    venueId: { in: venueIds },
                    status: 'PENDING',
                },
            }),

            // Monthly revenue (from settled payments)
            this.prisma.payment.aggregate({
                where: {
                    status: 'settlement',
                    paidAt: { gte: thisMonth },
                    participant: {
                        booking: { venueId: { in: venueIds } },
                    },
                },
                _sum: { amount: true },
            }),

            // Recent bookings
            this.prisma.booking.findMany({
                where: { venueId: { in: venueIds } },
                take: 10,
                orderBy: { createdAt: 'desc' },
                include: {
                    venue: { select: { name: true } },
                    owner: { select: { name: true, phone: true } },
                    participants: { select: { id: true } },
                },
            }),
        ]);

        return {
            stats: {
                totalVenues: venues.length,
                totalBookings,
                todayBookings,
                monthlyBookings,
                pendingBookings,
                monthlyRevenue: monthlyRevenue._sum.amount || 0,
            },
            venues,
            recentBookings,
        };
    }

    /**
     * Get venues milik pengelola
     */
    async getMyVenues(managerId: string) {
        return this.prisma.venue.findMany({
            where: { managerId },
            include: {
                schedules: { orderBy: { dayOfWeek: 'asc' } },
                _count: { select: { bookings: true } },
            },
            orderBy: { createdAt: 'desc' },
        });
    }

    /**
     * Create venue baru
     */
    async createVenue(managerId: string, dto: CreateVenueDto) {
        // Generate slug from venue name (SEO-friendly URL)
        const slug = dto.name
            .toLowerCase()
            .replace(/[^a-z0-9\s-]/g, '')
            .replace(/\s+/g, '-')
            .replace(/-+/g, '-');

        const venue = await this.prisma.venue.create({
            data: {
                managerId,
                slug,
                name: dto.name,
                description: dto.description,
                address: dto.address,
                city: dto.city,
                pricePerHour: dto.pricePerHour,
                capacity: dto.capacity,
                images: dto.images || [],
                facilities: dto.facilities || [],
                venueType: dto.venueType,
            },
        });

        // Create default schedule (08:00 - 22:00 for all days)
        const defaultSchedules = Array.from({ length: 7 }, (_, i) => ({
            venueId: venue.id,
            dayOfWeek: i,
            openTime: '08:00',
            closeTime: '22:00',
            isAvailable: true,
        }));

        await this.prisma.venueSchedule.createMany({
            data: defaultSchedules,
        });

        return {
            message: 'Venue berhasil dibuat',
            venue: await this.prisma.venue.findUnique({
                where: { id: venue.id },
                include: { schedules: true },
            }),
        };
    }

    /**
     * Update venue
     */
    async updateVenue(managerId: string, venueId: string, dto: Partial<CreateVenueDto>) {
        const venue = await this.prisma.venue.findUnique({
            where: { id: venueId },
        });

        if (!venue) {
            throw new NotFoundException('Venue tidak ditemukan');
        }

        if (venue.managerId !== managerId) {
            throw new ForbiddenException('Anda tidak memiliki akses ke venue ini');
        }

        const updated = await this.prisma.venue.update({
            where: { id: venueId },
            data: dto,
        });

        return {
            message: 'Venue berhasil diupdate',
            venue: updated,
        };
    }

    /**
     * Update venue schedule
     */
    async updateSchedule(managerId: string, venueId: string, dto: UpdateScheduleDto) {
        const venue = await this.prisma.venue.findUnique({
            where: { id: venueId },
        });

        if (!venue) {
            throw new NotFoundException('Venue tidak ditemukan');
        }

        if (venue.managerId !== managerId) {
            throw new ForbiddenException('Anda tidak memiliki akses ke venue ini');
        }

        // Upsert each schedule
        for (const schedule of dto.schedules) {
            await this.prisma.venueSchedule.upsert({
                where: {
                    venueId_dayOfWeek: {
                        venueId,
                        dayOfWeek: schedule.dayOfWeek,
                    },
                },
                update: {
                    openTime: schedule.openTime,
                    closeTime: schedule.closeTime,
                    isAvailable: schedule.isAvailable,
                },
                create: {
                    venueId,
                    dayOfWeek: schedule.dayOfWeek,
                    openTime: schedule.openTime,
                    closeTime: schedule.closeTime,
                    isAvailable: schedule.isAvailable,
                },
            });
        }

        return {
            message: 'Schedule berhasil diupdate',
            schedules: await this.prisma.venueSchedule.findMany({
                where: { venueId },
                orderBy: { dayOfWeek: 'asc' },
            }),
        };
    }

    /**
     * Block specific date
     */
    async blockDate(managerId: string, venueId: string, dto: BlockDateDto) {
        const venue = await this.prisma.venue.findUnique({
            where: { id: venueId },
        });

        if (!venue) {
            throw new NotFoundException('Venue tidak ditemukan');
        }

        if (venue.managerId !== managerId) {
            throw new ForbiddenException('Anda tidak memiliki akses ke venue ini');
        }

        const date = new Date(dto.date);

        // Check if already blocked
        const existing = await this.prisma.venueBlockedDate.findUnique({
            where: { venueId_date: { venueId, date } },
        });

        if (existing) {
            throw new BadRequestException('Tanggal sudah diblokir');
        }

        const blocked = await this.prisma.venueBlockedDate.create({
            data: {
                venueId,
                date,
                reason: dto.reason,
            },
        });

        return {
            message: 'Tanggal berhasil diblokir',
            blockedDate: blocked,
        };
    }

    /**
     * Unblock date
     */
    async unblockDate(managerId: string, venueId: string, date: string) {
        const venue = await this.prisma.venue.findUnique({
            where: { id: venueId },
        });

        if (!venue || venue.managerId !== managerId) {
            throw new ForbiddenException('Anda tidak memiliki akses');
        }

        await this.prisma.venueBlockedDate.delete({
            where: { venueId_date: { venueId, date: new Date(date) } },
        });

        return { message: 'Tanggal berhasil di-unblock' };
    }

    /**
     * Get blocked dates
     */
    async getBlockedDates(managerId: string, venueId: string) {
        const venue = await this.prisma.venue.findUnique({
            where: { id: venueId },
        });

        if (!venue || venue.managerId !== managerId) {
            throw new ForbiddenException('Anda tidak memiliki akses');
        }

        return this.prisma.venueBlockedDate.findMany({
            where: { venueId },
            orderBy: { date: 'asc' },
        });
    }

    /**
     * Get bookings for my venues
     */
    async getMyBookings(managerId: string, params: {
        venueId?: string;
        status?: string;
        fromDate?: Date;
        toDate?: Date;
        skip?: number;
        take?: number;
    }) {
        const { venueId, status, fromDate, toDate, skip = 0, take = 20 } = params;

        // First get all venue IDs owned by this manager
        const venues = await this.prisma.venue.findMany({
            where: { managerId },
            select: { id: true },
        });

        const venueIds = venues.map(v => v.id);

        const where: any = {
            venueId: venueId ? venueId : { in: venueIds },
        };

        if (status) where.status = status;
        if (fromDate || toDate) {
            where.date = {};
            if (fromDate) where.date.gte = fromDate;
            if (toDate) where.date.lte = toDate;
        }

        const [bookings, total] = await Promise.all([
            this.prisma.booking.findMany({
                where,
                skip,
                take,
                orderBy: { date: 'desc' },
                include: {
                    venue: { select: { id: true, name: true } },
                    owner: { select: { id: true, name: true, phone: true } },
                    participants: {
                        include: {
                            user: { select: { name: true } },
                        },
                    },
                    chatRoom: { select: { id: true } },
                },
            }),
            this.prisma.booking.count({ where }),
        ]);

        return {
            data: bookings,
            meta: { total, skip, take, hasMore: skip + take < total },
        };
    }
}
