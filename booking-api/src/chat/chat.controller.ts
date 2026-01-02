/**
 * Chat Controller
 * 
 * REST endpoints untuk chat (complement WebSocket):
 * - GET /chat/rooms - Get user's chat rooms
 * - GET /chat/rooms/:id - Get room details
 * - GET /chat/rooms/:id/messages - Get room messages
 */

import {
    Controller,
    Get,
    Param,
    Query,
    UseGuards,
    ParseUUIDPipe,
} from '@nestjs/common';
import { ChatService } from './chat.service';
import { JwtAuthGuard } from '../auth/guards';
import { CurrentUser } from '../auth/decorators';

@Controller('chat')
@UseGuards(JwtAuthGuard)
export class ChatController {
    constructor(private chatService: ChatService) { }

    /**
     * Get user's chat rooms
     */
    @Get('rooms')
    async getUserRooms(@CurrentUser() user: any) {
        return this.chatService.getUserRooms(user.id);
    }

    /**
     * Get room details
     */
    @Get('rooms/:id')
    async getRoom(@Param('id', ParseUUIDPipe) id: string) {
        return this.chatService.getRoomById(id);
    }

    /**
     * Get room messages with pagination
     */
    @Get('rooms/:id/messages')
    async getRoomMessages(
        @Param('id', ParseUUIDPipe) id: string,
        @Query('take') take?: string,
        @Query('cursor') cursor?: string,
    ) {
        return this.chatService.getRoomMessages(
            id,
            take ? parseInt(take) : 50,
            cursor,
        );
    }

    /**
     * Get unread message count for a room
     */
    @Get('rooms/:id/unread')
    async getUnreadCount(
        @Param('id', ParseUUIDPipe) id: string,
        @CurrentUser() user: any,
    ) {
        return {
            count: await this.chatService.getUnreadCount(id, user.id),
        };
    }
}
