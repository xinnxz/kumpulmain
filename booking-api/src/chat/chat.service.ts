/**
 * Chat Service
 * 
 * Service untuk mengelola chat rooms dan messages.
 * Digunakan oleh ChatGateway untuk persistence.
 */

import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { Role } from '@prisma/client';

interface SaveMessageDto {
    chatRoomId: string;
    senderId: string;
    content: string;
}

@Injectable()
export class ChatService {
    constructor(private prisma: PrismaService) { }

    /**
     * Check apakah user bisa join room
     * User harus participant booking atau admin
     */
    async canUserJoinRoom(bookingId: string, userId: string): Promise<boolean> {
        // Check if user is admin
        const user = await this.prisma.user.findUnique({
            where: { id: userId },
            select: { role: true },
        });

        if (user?.role === Role.ADMIN) {
            return true;
        }

        // Check if user is participant of the booking
        const participant = await this.prisma.bookingParticipant.findUnique({
            where: {
                bookingId_userId: { bookingId, userId },
            },
        });

        return !!participant;
    }

    /**
     * Get or create chat room for booking
     */
    async getOrCreateRoom(bookingId: string) {
        let room = await this.prisma.chatRoom.findUnique({
            where: { bookingId },
        });

        if (!room) {
            room = await this.prisma.chatRoom.create({
                data: { bookingId },
            });
        }

        return room;
    }

    /**
     * Get room by ID
     */
    async getRoomById(roomId: string) {
        const room = await this.prisma.chatRoom.findUnique({
            where: { id: roomId },
            include: {
                booking: {
                    include: {
                        venue: { select: { name: true } },
                        participants: {
                            include: {
                                user: { select: { id: true, name: true } },
                            },
                        },
                    },
                },
            },
        });

        if (!room) {
            throw new NotFoundException('Chat room tidak ditemukan');
        }

        return room;
    }

    /**
     * Get messages in room with pagination
     */
    async getRoomMessages(
        roomId: string,
        take: number = 50,
        cursor?: string,
    ) {
        const messages = await this.prisma.message.findMany({
            where: { chatRoomId: roomId },
            take,
            skip: cursor ? 1 : 0,
            cursor: cursor ? { id: cursor } : undefined,
            orderBy: { createdAt: 'desc' },
            include: {
                sender: {
                    select: { id: true, name: true, role: true },
                },
            },
        });

        // Return in chronological order
        return messages.reverse();
    }

    /**
     * Save message to database
     */
    async saveMessage(dto: SaveMessageDto) {
        const message = await this.prisma.message.create({
            data: {
                chatRoomId: dto.chatRoomId,
                senderId: dto.senderId,
                content: dto.content,
            },
            include: {
                sender: {
                    select: { id: true, name: true, role: true },
                },
            },
        });

        return message;
    }

    /**
     * Mark messages as read
     */
    async markAsRead(roomId: string, userId: string) {
        await this.prisma.message.updateMany({
            where: {
                chatRoomId: roomId,
                senderId: { not: userId },
                isRead: false,
            },
            data: { isRead: true },
        });
    }

    /**
     * Get unread message count
     */
    async getUnreadCount(roomId: string, userId: string) {
        return this.prisma.message.count({
            where: {
                chatRoomId: roomId,
                senderId: { not: userId },
                isRead: false,
            },
        });
    }

    /**
     * Get all chat rooms for a user (based on their bookings)
     */
    async getUserRooms(userId: string) {
        const user = await this.prisma.user.findUnique({
            where: { id: userId },
            select: { role: true },
        });

        // Admin can see all rooms
        if (user?.role === Role.ADMIN) {
            return this.prisma.chatRoom.findMany({
                where: { isActive: true },
                include: {
                    booking: {
                        include: {
                            venue: { select: { name: true } },
                            owner: { select: { name: true } },
                        },
                    },
                    messages: {
                        take: 1,
                        orderBy: { createdAt: 'desc' },
                    },
                },
                orderBy: { createdAt: 'desc' },
            });
        }

        // Regular user can only see rooms from their bookings
        return this.prisma.chatRoom.findMany({
            where: {
                isActive: true,
                booking: {
                    participants: {
                        some: { userId },
                    },
                },
            },
            include: {
                booking: {
                    include: {
                        venue: { select: { name: true } },
                        owner: { select: { name: true } },
                    },
                },
                messages: {
                    take: 1,
                    orderBy: { createdAt: 'desc' },
                },
            },
            orderBy: { createdAt: 'desc' },
        });
    }
}
