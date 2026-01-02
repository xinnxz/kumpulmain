/**
 * Invitations Controller
 * 
 * Endpoints untuk undangan main bareng:
 * - GET /invitations/public - Browse public invitations
 * - GET /invitations/:code - Get invitation by code
 * - POST /invitations/:code/join - Join via invite code
 * - POST /invitations/:bookingId/regenerate - Regenerate invite code
 * - PATCH /invitations/:bookingId/type - Toggle PUBLIC/PRIVATE
 */

import {
    Controller,
    Get,
    Post,
    Patch,
    Param,
    Query,
    Body,
    UseGuards,
    ParseUUIDPipe,
} from '@nestjs/common';
import { InvitationsService } from './invitations.service';
import { JwtAuthGuard } from '../auth/guards';
import { CurrentUser } from '../auth/decorators';
import { InviteType } from '@prisma/client';

@Controller('invitations')
export class InvitationsController {
    constructor(private invitationsService: InvitationsService) { }

    /**
     * Browse public invitations (no auth required)
     */
    @Get('public')
    async browsePublic(
        @Query('city') city?: string,
        @Query('venueType') venueType?: string,
        @Query('date') date?: string,
        @Query('skip') skip?: string,
        @Query('take') take?: string,
    ) {
        return this.invitationsService.browsePublic({
            city,
            venueType,
            date: date ? new Date(date) : undefined,
            skip: skip ? parseInt(skip) : undefined,
            take: take ? parseInt(take) : undefined,
        });
    }

    /**
     * Get invitation by code (no auth required to view)
     */
    @Get(':code')
    async getByCode(@Param('code') code: string) {
        return this.invitationsService.getByCode(code);
    }

    /**
     * Join via invite code
     */
    @Post(':code/join')
    @UseGuards(JwtAuthGuard)
    async joinByCode(
        @Param('code') code: string,
        @CurrentUser() user: any,
    ) {
        return this.invitationsService.joinByCode(code, user.id);
    }

    /**
     * Regenerate invite code (owner only)
     */
    @Post(':bookingId/regenerate')
    @UseGuards(JwtAuthGuard)
    async regenerateCode(
        @Param('bookingId', ParseUUIDPipe) bookingId: string,
        @CurrentUser() user: any,
    ) {
        return this.invitationsService.regenerateInviteCode(bookingId, user.id);
    }

    /**
     * Toggle invite type (PUBLIC/PRIVATE)
     */
    @Patch(':bookingId/type')
    @UseGuards(JwtAuthGuard)
    async toggleType(
        @Param('bookingId', ParseUUIDPipe) bookingId: string,
        @CurrentUser() user: any,
        @Body('inviteType') inviteType: InviteType,
    ) {
        return this.invitationsService.toggleInviteType(bookingId, user.id, inviteType);
    }
}
