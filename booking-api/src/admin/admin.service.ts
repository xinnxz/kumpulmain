/**
 * Admin Service
 * 
 * Service untuk admin dashboard dengan berbagai metrics dan management functions.
 */

import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { BookingStatus, PaymentStatus, Role } from '@prisma/client';

@Injectable()
export class AdminService {
    constructor(private prisma: PrismaService) { }

    /**
     * Get dashboard overview statistics
     */
    async getDashboardStats() {
        const today = new Date();
        today.setHours(0, 0, 0, 0);

        const thisMonth = new Date(today.getFullYear(), today.getMonth(), 1);
        const lastMonth = new Date(today.getFullYear(), today.getMonth() - 1, 1);

        const [
            totalUsers,
            totalVenues,
            totalBookings,
            activeBookings,
            todayBookings,
            monthlyBookings,
            pendingPayments,
            monthlyRevenue,
            lastMonthRevenue,
            recentBookings,
        ] = await Promise.all([
            // Total users
            this.prisma.user.count({ where: { role: Role.USER } }),

            // Total venues
            this.prisma.venue.count({ where: { isActive: true } }),

            // Total bookings all time
            this.prisma.booking.count(),

            // Active bookings (OPEN or CONFIRMED)
            this.prisma.booking.count({
                where: { status: { in: [BookingStatus.OPEN, BookingStatus.CONFIRMED] } },
            }),

            // Today's bookings
            this.prisma.booking.count({
                where: { date: { gte: today } },
            }),

            // This month's bookings
            this.prisma.booking.count({
                where: { createdAt: { gte: thisMonth } },
            }),

            // Pending payments count
            this.prisma.bookingParticipant.count({
                where: { paymentStatus: PaymentStatus.PENDING },
            }),

            // This month's revenue
            this.prisma.payment.aggregate({
                where: {
                    status: 'settlement',
                    paidAt: { gte: thisMonth },
                },
                _sum: { amount: true },
            }),

            // Last month's revenue
            this.prisma.payment.aggregate({
                where: {
                    status: 'settlement',
                    paidAt: { gte: lastMonth, lt: thisMonth },
                },
                _sum: { amount: true },
            }),

            // Recent bookings
            this.prisma.booking.findMany({
                take: 5,
                orderBy: { createdAt: 'desc' },
                include: {
                    venue: { select: { name: true } },
                    owner: { select: { name: true, email: true } },
                },
            }),
        ]);

        const currentRevenue = monthlyRevenue._sum.amount || 0;
        const previousRevenue = lastMonthRevenue._sum.amount || 0;
        const revenueGrowth = previousRevenue > 0
            ? ((currentRevenue - previousRevenue) / previousRevenue) * 100
            : 0;

        return {
            stats: {
                totalUsers,
                totalVenues,
                totalBookings,
                activeBookings,
                todayBookings,
                monthlyBookings,
                pendingPayments,
                monthlyRevenue: currentRevenue,
                revenueGrowth: Math.round(revenueGrowth * 100) / 100,
            },
            recentBookings,
        };
    }

    /**
     * Get all users with pagination
     */
    async getUsers(params: {
        skip?: number;
        take?: number;
        search?: string;
        role?: Role;
    }) {
        const { skip = 0, take = 10, search, role } = params;

        const where: any = {};

        if (role) where.role = role;

        if (search) {
            where.OR = [
                { name: { contains: search, mode: 'insensitive' } },
                { email: { contains: search, mode: 'insensitive' } },
            ];
        }

        const [users, total] = await Promise.all([
            this.prisma.user.findMany({
                where,
                skip,
                take,
                orderBy: { createdAt: 'desc' },
                select: {
                    id: true,
                    email: true,
                    name: true,
                    phone: true,
                    role: true,
                    isActive: true,
                    createdAt: true,
                    _count: {
                        select: {
                            bookings: true,
                            participants: true,
                        },
                    },
                },
            }),
            this.prisma.user.count({ where }),
        ]);

        return { data: users, meta: { total, skip, take } };
    }

    /**
     * Get all bookings with pagination and filters
     */
    async getBookings(params: {
        skip?: number;
        take?: number;
        status?: BookingStatus;
        venueId?: string;
        fromDate?: Date;
        toDate?: Date;
    }) {
        const { skip = 0, take = 10, status, venueId, fromDate, toDate } = params;

        const where: any = {};

        if (status) where.status = status;
        if (venueId) where.venueId = venueId;

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
                orderBy: { createdAt: 'desc' },
                include: {
                    venue: { select: { id: true, name: true } },
                    owner: { select: { id: true, name: true, email: true } },
                    participants: {
                        include: {
                            user: { select: { id: true, name: true } },
                            payment: { select: { status: true, amount: true } },
                        },
                    },
                },
            }),
            this.prisma.booking.count({ where }),
        ]);

        return { data: bookings, meta: { total, skip, take } };
    }

    /**
     * Get payment reports
     */
    async getPaymentReports(params: {
        fromDate?: Date;
        toDate?: Date;
        status?: string;
    }) {
        const { fromDate, toDate, status } = params;

        const where: any = {};

        if (status) where.status = status;

        if (fromDate || toDate) {
            where.createdAt = {};
            if (fromDate) where.createdAt.gte = fromDate;
            if (toDate) where.createdAt.lte = toDate;
        }

        const [payments, summary] = await Promise.all([
            this.prisma.payment.findMany({
                where,
                orderBy: { createdAt: 'desc' },
                include: {
                    participant: {
                        include: {
                            user: { select: { name: true, email: true } },
                            booking: {
                                include: {
                                    venue: { select: { name: true } },
                                },
                            },
                        },
                    },
                },
            }),
            this.prisma.payment.groupBy({
                by: ['status'],
                where,
                _sum: { amount: true },
                _count: true,
            }),
        ]);

        return { payments, summary };
    }

    /**
     * Update booking status (admin action)
     */
    async updateBookingStatus(bookingId: string, status: BookingStatus) {
        const booking = await this.prisma.booking.findUnique({
            where: { id: bookingId },
        });

        if (!booking) {
            throw new NotFoundException('Booking tidak ditemukan');
        }

        const updated = await this.prisma.booking.update({
            where: { id: bookingId },
            data: { status },
        });

        return {
            message: `Status booking berhasil diubah ke ${status}`,
            booking: updated,
        };
    }

    /**
     * Toggle user active status
     */
    async toggleUserStatus(userId: string) {
        const user = await this.prisma.user.findUnique({
            where: { id: userId },
        });

        if (!user) {
            throw new NotFoundException('User tidak ditemukan');
        }

        const updated = await this.prisma.user.update({
            where: { id: userId },
            data: { isActive: !user.isActive },
        });

        return {
            message: `User ${updated.isActive ? 'diaktifkan' : 'dinonaktifkan'}`,
            user: updated,
        };
    }
}
