/**
 * Venues Service - KumpulMain.id
 * 
 * Service untuk browsing venues (public endpoints).
 * CRUD operations untuk venues handled by PengelolaService.
 */

import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class VenuesService {
    constructor(private prisma: PrismaService) { }

    /**
     * Get semua venues yang aktif
     * Bisa di-filter dan di-paginate
     */
    async findAll(params: {
        skip?: number;
        take?: number;
        search?: string;
        city?: string;
        venueType?: string;
        minPrice?: number;
        maxPrice?: number;
        minCapacity?: number;
    }) {
        const { skip = 0, take = 10, search, city, venueType, minPrice, maxPrice, minCapacity } = params;

        const where: any = {
            isActive: true,
        };

        // Search by name or address
        if (search) {
            where.OR = [
                { name: { contains: search, mode: 'insensitive' } },
                { address: { contains: search, mode: 'insensitive' } },
            ];
        }

        // Filter by city
        if (city) {
            where.city = city;
        }

        // Filter by venue type
        if (venueType) {
            where.venueType = venueType;
        }

        // Filter by price range
        if (minPrice !== undefined || maxPrice !== undefined) {
            where.pricePerHour = {};
            if (minPrice !== undefined) where.pricePerHour.gte = minPrice;
            if (maxPrice !== undefined) where.pricePerHour.lte = maxPrice;
        }

        // Filter by minimum capacity
        if (minCapacity !== undefined) {
            where.capacity = { gte: minCapacity };
        }

        const [venues, total] = await Promise.all([
            this.prisma.venue.findMany({
                where,
                skip,
                take,
                orderBy: { createdAt: 'desc' },
                include: {
                    manager: { select: { name: true } },
                    schedules: { orderBy: { dayOfWeek: 'asc' } },
                },
            }),
            this.prisma.venue.count({ where }),
        ]);

        return {
            data: venues,
            meta: {
                total,
                skip,
                take,
                hasMore: skip + take < total,
            },
        };
    }

    /**
     * Get distinct cities for filter
     */
    async getCities() {
        const venues = await this.prisma.venue.findMany({
            where: { isActive: true },
            select: { city: true },
            distinct: ['city'],
        });

        return venues.map(v => v.city).filter(Boolean);
    }

    /**
     * Get distinct venue types for filter
     */
    async getVenueTypes() {
        const venues = await this.prisma.venue.findMany({
            where: { isActive: true },
            select: { venueType: true },
            distinct: ['venueType'],
        });

        return venues.map(v => v.venueType).filter(Boolean);
    }

    /**
     * Get venue by ID or slug
     * Supports both UUID and slug for SEO-friendly URLs
     */
    async findOne(identifier: string) {
        // Check if identifier is UUID or slug
        const isUUID = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i.test(identifier);

        const venue = await this.prisma.venue.findFirst({
            where: isUUID
                ? { id: identifier, isActive: true }
                : { slug: identifier, isActive: true },
            include: {
                manager: { select: { name: true, phone: true } },
                schedules: { orderBy: { dayOfWeek: 'asc' } },
            },
        });

        if (!venue) {
            throw new NotFoundException('Venue tidak ditemukan');
        }

        return venue;
    }

    /**
     * Get venue dengan available time slots untuk tanggal tertentu
     */
    async findOneWithAvailability(id: string, date: Date) {
        const venue = await this.findOne(id);

        // Get day of week (0 = Sunday, 6 = Saturday)
        const dayOfWeek = date.getDay();

        // Find schedule for this day
        const schedule = venue.schedules.find(s => s.dayOfWeek === dayOfWeek);

        if (!schedule || !schedule.isAvailable) {
            return {
                ...venue,
                date: date.toISOString().split('T')[0],
                slots: [],
                message: 'Venue tutup di hari ini',
            };
        }

        // Check if date is blocked
        const blockedDate = await this.prisma.venueBlockedDate.findUnique({
            where: { venueId_date: { venueId: id, date } },
        });

        if (blockedDate) {
            return {
                ...venue,
                date: date.toISOString().split('T')[0],
                slots: [],
                message: `Venue tutup: ${blockedDate.reason || 'Tidak tersedia'}`,
            };
        }

        // Get existing bookings for this date
        const bookings = await this.prisma.booking.findMany({
            where: {
                venueId: id,
                date: date,
                status: { notIn: ['CANCELLED'] },
            },
            select: {
                startTime: true,
                endTime: true,
            },
        });

        // Generate time slots (1 hour intervals)
        const openHour = parseInt(schedule.openTime.split(':')[0]);
        const closeHour = parseInt(schedule.closeTime.split(':')[0]);
        const slots: { start: string; end: string; available: boolean }[] = [];

        for (let hour = openHour; hour < closeHour; hour++) {
            const slotStart = `${hour.toString().padStart(2, '0')}:00`;
            const slotEnd = `${(hour + 1).toString().padStart(2, '0')}:00`;

            // Check if slot is booked
            const isBooked = bookings.some((booking) => {
                const bookingStart = parseInt(booking.startTime.split(':')[0]);
                const bookingEnd = parseInt(booking.endTime.split(':')[0]);
                return hour >= bookingStart && hour < bookingEnd;
            });

            slots.push({
                start: slotStart,
                end: slotEnd,
                available: !isBooked,
            });
        }

        return {
            ...venue,
            date: date.toISOString().split('T')[0],
            slots,
        };
    }
}
