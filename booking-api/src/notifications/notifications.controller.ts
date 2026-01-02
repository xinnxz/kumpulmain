/**
 * Notifications Controller
 * 
 * Endpoints untuk mengelola notifikasi:
 * - GET /notifications - Get my notifications
 * - GET /notifications/unread-count - Get unread count
 * - PATCH /notifications/:id/read - Mark as read
 * - PATCH /notifications/read-all - Mark all as read
 */

import {
    Controller,
    Get,
    Patch,
    Param,
    Query,
    UseGuards,
    ParseUUIDPipe,
} from '@nestjs/common';
import { NotificationsService } from './notifications.service';
import { JwtAuthGuard } from '../auth/guards';
import { CurrentUser } from '../auth/decorators';

@Controller('notifications')
@UseGuards(JwtAuthGuard)
export class NotificationsController {
    constructor(private notificationsService: NotificationsService) { }

    /**
     * Get my notifications
     */
    @Get()
    async getNotifications(
        @CurrentUser() user: any,
        @Query('skip') skip?: string,
        @Query('take') take?: string,
        @Query('unreadOnly') unreadOnly?: string,
    ) {
        return this.notificationsService.getForUser(user.id, {
            skip: skip ? parseInt(skip) : undefined,
            take: take ? parseInt(take) : undefined,
            unreadOnly: unreadOnly === 'true',
        });
    }

    /**
     * Get unread count
     */
    @Get('unread-count')
    async getUnreadCount(@CurrentUser() user: any) {
        const count = await this.notificationsService.getUnreadCount(user.id);
        return { count };
    }

    /**
     * Mark notification as read
     */
    @Patch(':id/read')
    async markAsRead(
        @CurrentUser() user: any,
        @Param('id', ParseUUIDPipe) id: string,
    ) {
        await this.notificationsService.markAsRead(id, user.id);
        return { message: 'Notifikasi ditandai sudah dibaca' };
    }

    /**
     * Mark all as read
     */
    @Patch('read-all')
    async markAllAsRead(@CurrentUser() user: any) {
        await this.notificationsService.markAllAsRead(user.id);
        return { message: 'Semua notifikasi ditandai sudah dibaca' };
    }
}
