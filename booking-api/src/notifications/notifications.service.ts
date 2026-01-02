/**
 * Notification Service
 * 
 * Service untuk mengelola notifikasi.
 * Terintegrasi dengan WebSocket untuk real-time notifications.
 */

import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { NotificationType } from '@prisma/client';

interface CreateNotificationDto {
    userId: string;
    type: NotificationType;
    title: string;
    message: string;
    data?: any;
}

@Injectable()
export class NotificationsService {
    constructor(private prisma: PrismaService) { }

    /**
     * Create notification
     */
    async create(dto: CreateNotificationDto) {
        return this.prisma.notification.create({
            data: {
                userId: dto.userId,
                type: dto.type,
                title: dto.title,
                message: dto.message,
                data: dto.data,
            },
        });
    }

    /**
     * Create notification untuk banyak users sekaligus
     */
    async createMany(userIds: string[], notification: Omit<CreateNotificationDto, 'userId'>) {
        const data = userIds.map(userId => ({
            userId,
            type: notification.type,
            title: notification.title,
            message: notification.message,
            data: notification.data,
        }));

        return this.prisma.notification.createMany({ data });
    }

    /**
     * Get notifications untuk user
     */
    async getForUser(userId: string, params: {
        skip?: number;
        take?: number;
        unreadOnly?: boolean;
    }) {
        const { skip = 0, take = 20, unreadOnly = false } = params;

        const where: any = { userId };
        if (unreadOnly) where.isRead = false;

        const [notifications, total, unreadCount] = await Promise.all([
            this.prisma.notification.findMany({
                where,
                skip,
                take,
                orderBy: { createdAt: 'desc' },
            }),
            this.prisma.notification.count({ where }),
            this.prisma.notification.count({ where: { userId, isRead: false } }),
        ]);

        return {
            data: notifications,
            meta: { total, unreadCount, skip, take },
        };
    }

    /**
     * Mark notification as read
     */
    async markAsRead(notificationId: string, userId: string) {
        return this.prisma.notification.updateMany({
            where: { id: notificationId, userId },
            data: { isRead: true },
        });
    }

    /**
     * Mark all notifications as read
     */
    async markAllAsRead(userId: string) {
        return this.prisma.notification.updateMany({
            where: { userId, isRead: false },
            data: { isRead: true },
        });
    }

    /**
     * Get unread count
     */
    async getUnreadCount(userId: string) {
        return this.prisma.notification.count({
            where: { userId, isRead: false },
        });
    }

    // =====================
    // NOTIFICATION HELPERS
    // =====================

    /**
     * Notify pengelola tentang booking baru
     */
    async notifyNewBooking(booking: any) {
        const venue = await this.prisma.venue.findUnique({
            where: { id: booking.venueId },
            select: { managerId: true, name: true },
        });

        if (!venue) return;

        return this.create({
            userId: venue.managerId,
            type: NotificationType.BOOKING_NEW,
            title: 'Booking Baru!',
            message: `Ada booking baru di ${venue.name} untuk tanggal ${booking.date}`,
            data: { bookingId: booking.id, venueId: venue },
        });
    }

    /**
     * Notify semua participants saat booking confirmed
     */
    async notifyBookingConfirmed(bookingId: string) {
        const booking = await this.prisma.booking.findUnique({
            where: { id: bookingId },
            include: {
                venue: { select: { name: true } },
                participants: { select: { userId: true } },
            },
        });

        if (!booking) return;

        const userIds = booking.participants.map(p => p.userId);

        return this.createMany(userIds, {
            type: NotificationType.BOOKING_CONFIRMED,
            title: 'Booking Dikonfirmasi!',
            message: `Booking di ${booking.venue.name} sudah terkonfirmasi. Sampai ketemu di lapangan!`,
            data: { bookingId },
        });
    }

    /**
     * Notify owner saat ada yang join
     */
    async notifyJoinanJoined(bookingId: string, joinerName: string) {
        const booking = await this.prisma.booking.findUnique({
            where: { id: bookingId },
            select: { ownerId: true, title: true },
        });

        if (!booking) return;

        return this.create({
            userId: booking.ownerId,
            type: NotificationType.JOINAN_JOINED,
            title: 'Ada yang Join!',
            message: `${joinerName} bergabung di "${booking.title || 'Main Bareng'}"`,
            data: { bookingId },
        });
    }

    /**
     * Notify user saat payment success
     */
    async notifyPaymentSuccess(userId: string, bookingId: string, amount: number) {
        return this.create({
            userId,
            type: NotificationType.PAYMENT_SUCCESS,
            title: 'Pembayaran Berhasil!',
            message: `Pembayaran Rp ${amount.toLocaleString('id-ID')} berhasil dikonfirmasi`,
            data: { bookingId, amount },
        });
    }
}
