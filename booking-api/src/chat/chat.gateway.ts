/**
 * Chat Gateway (WebSocket)
 * 
 * WebSocket gateway untuk real-time chat dalam booking rooms.
 * 
 * Features:
 * - Join room berdasarkan booking ID
 * - Send message ke semua participants dalam room
 * - Typing indicator
 * - Message persistence di database
 * 
 * Events:
 * - joinRoom: Join chat room
 * - leaveRoom: Leave chat room  
 * - sendMessage: Send message ke room
 * - typing: Notify typing status
 */

import {
    WebSocketGateway,
    WebSocketServer,
    SubscribeMessage,
    OnGatewayInit,
    OnGatewayConnection,
    OnGatewayDisconnect,
    MessageBody,
    ConnectedSocket,
} from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';
import { Logger, UseGuards } from '@nestjs/common';
import { ChatService } from './chat.service';

// DTO for messages
interface JoinRoomPayload {
    bookingId: string;
    userId: string;
    userName: string;
}

interface SendMessagePayload {
    roomId: string;
    senderId: string;
    senderName: string;
    content: string;
}

interface TypingPayload {
    roomId: string;
    userId: string;
    userName: string;
    isTyping: boolean;
}

@WebSocketGateway({
    cors: {
        origin: process.env.FRONTEND_URL || 'http://localhost:3000',
        credentials: true,
    },
    namespace: '/chat',
})
export class ChatGateway
    implements OnGatewayInit, OnGatewayConnection, OnGatewayDisconnect {
    @WebSocketServer()
    server: Server;

    private logger = new Logger('ChatGateway');

    // Track connected users per room
    private roomUsers: Map<string, Set<string>> = new Map();

    constructor(private chatService: ChatService) { }

    afterInit(server: Server) {
        this.logger.log('Chat WebSocket Gateway initialized');
    }

    handleConnection(client: Socket) {
        this.logger.log(`Client connected: ${client.id}`);
    }

    handleDisconnect(client: Socket) {
        this.logger.log(`Client disconnected: ${client.id}`);

        // Remove from all rooms
        this.roomUsers.forEach((users, roomId) => {
            users.delete(client.id);
            if (users.size === 0) {
                this.roomUsers.delete(roomId);
            }
        });
    }

    /**
     * Join chat room untuk booking
     * Client harus verify dulu bahwa mereka participant booking ini
     */
    @SubscribeMessage('joinRoom')
    async handleJoinRoom(
        @ConnectedSocket() client: Socket,
        @MessageBody() payload: JoinRoomPayload,
    ) {
        const { bookingId, userId, userName } = payload;

        try {
            // Verify user is participant of this booking
            const canJoin = await this.chatService.canUserJoinRoom(bookingId, userId);

            if (!canJoin) {
                return {
                    event: 'error',
                    data: { message: 'Anda tidak memiliki akses ke room ini' },
                };
            }

            // Get or create chat room
            const room = await this.chatService.getOrCreateRoom(bookingId);
            const roomId = room.id;

            // Join socket room
            client.join(roomId);

            // Track user in room
            if (!this.roomUsers.has(roomId)) {
                this.roomUsers.set(roomId, new Set());
            }
            this.roomUsers.get(roomId)!.add(client.id);

            // Get previous messages
            const messages = await this.chatService.getRoomMessages(roomId);

            // Notify room about new user
            this.server.to(roomId).emit('userJoined', {
                userId,
                userName,
                onlineCount: this.roomUsers.get(roomId)?.size || 0,
            });

            this.logger.log(`User ${userName} joined room ${roomId}`);

            return {
                event: 'joinedRoom',
                data: {
                    roomId,
                    messages,
                    onlineCount: this.roomUsers.get(roomId)?.size || 0,
                },
            };
        } catch (error) {
            this.logger.error('Error joining room:', error);
            return {
                event: 'error',
                data: { message: 'Gagal join room' },
            };
        }
    }

    /**
     * Leave chat room
     */
    @SubscribeMessage('leaveRoom')
    handleLeaveRoom(
        @ConnectedSocket() client: Socket,
        @MessageBody() payload: { roomId: string; userId: string; userName: string },
    ) {
        const { roomId, userId, userName } = payload;

        client.leave(roomId);

        this.roomUsers.get(roomId)?.delete(client.id);

        this.server.to(roomId).emit('userLeft', {
            userId,
            userName,
            onlineCount: this.roomUsers.get(roomId)?.size || 0,
        });

        this.logger.log(`User ${userName} left room ${roomId}`);

        return { event: 'leftRoom', data: { roomId } };
    }

    /**
     * Send message ke room
     */
    @SubscribeMessage('sendMessage')
    async handleMessage(
        @ConnectedSocket() client: Socket,
        @MessageBody() payload: SendMessagePayload,
    ) {
        const { roomId, senderId, senderName, content } = payload;

        try {
            // Save message to database
            const message = await this.chatService.saveMessage({
                chatRoomId: roomId,
                senderId,
                content,
            });

            // Broadcast to all users in room (including sender)
            this.server.to(roomId).emit('newMessage', {
                id: message.id,
                senderId,
                senderName,
                content,
                createdAt: message.createdAt,
            });

            this.logger.log(`Message sent in room ${roomId} by ${senderName}`);

            return { event: 'messageSent', data: { messageId: message.id } };
        } catch (error) {
            this.logger.error('Error sending message:', error);
            return {
                event: 'error',
                data: { message: 'Gagal mengirim pesan' },
            };
        }
    }

    /**
     * Typing indicator
     */
    @SubscribeMessage('typing')
    handleTyping(
        @ConnectedSocket() client: Socket,
        @MessageBody() payload: TypingPayload,
    ) {
        const { roomId, userId, userName, isTyping } = payload;

        // Broadcast to room except sender
        client.to(roomId).emit('userTyping', {
            userId,
            userName,
            isTyping,
        });
    }

    /**
     * Get online users in room
     */
    @SubscribeMessage('getOnlineUsers')
    handleGetOnlineUsers(@MessageBody() payload: { roomId: string }) {
        const count = this.roomUsers.get(payload.roomId)?.size || 0;
        return { event: 'onlineCount', data: { count } };
    }
}
