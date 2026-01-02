/**
 * Pengelola Controller
 * 
 * Endpoints untuk venue managers (pengelola):
 * - GET /pengelola/dashboard - Dashboard stats
 * - GET /pengelola/venues - My venues
 * - POST /pengelola/venues - Create venue
 * - PUT /pengelola/venues/:id - Update venue
 * - PUT /pengelola/venues/:id/schedule - Update schedule
 * - POST /pengelola/venues/:id/block-date - Block date
 * - DELETE /pengelola/venues/:id/block-date/:date - Unblock date
 * - GET /pengelola/bookings - Bookings at my venues
 */

import {
    Controller,
    Get,
    Post,
    Put,
    Delete,
    Body,
    Param,
    Query,
    UseGuards,
    ParseUUIDPipe,
} from '@nestjs/common';
import { PengelolaService } from './pengelola.service';
import { JwtAuthGuard, RolesGuard } from '../auth/guards';
import { Roles, CurrentUser } from '../auth/decorators';
import { Role } from '@prisma/client';

@Controller('pengelola')
@UseGuards(JwtAuthGuard, RolesGuard)
@Roles(Role.PENGELOLA, Role.ADMIN)
export class PengelolaController {
    constructor(private pengelolaService: PengelolaService) { }

    /**
     * Dashboard stats
     */
    @Get('dashboard')
    async getDashboard(@CurrentUser() user: any) {
        return this.pengelolaService.getDashboard(user.id);
    }

    /**
     * Get my venues
     */
    @Get('venues')
    async getMyVenues(@CurrentUser() user: any) {
        return this.pengelolaService.getMyVenues(user.id);
    }

    /**
     * Create venue
     */
    @Post('venues')
    async createVenue(
        @CurrentUser() user: any,
        @Body() dto: any,
    ) {
        return this.pengelolaService.createVenue(user.id, dto);
    }

    /**
     * Update venue
     */
    @Put('venues/:id')
    async updateVenue(
        @CurrentUser() user: any,
        @Param('id', ParseUUIDPipe) id: string,
        @Body() dto: any,
    ) {
        return this.pengelolaService.updateVenue(user.id, id, dto);
    }

    /**
     * Update venue schedule
     */
    @Put('venues/:id/schedule')
    async updateSchedule(
        @CurrentUser() user: any,
        @Param('id', ParseUUIDPipe) id: string,
        @Body() dto: any,
    ) {
        return this.pengelolaService.updateSchedule(user.id, id, dto);
    }

    /**
     * Get blocked dates
     */
    @Get('venues/:id/blocked-dates')
    async getBlockedDates(
        @CurrentUser() user: any,
        @Param('id', ParseUUIDPipe) id: string,
    ) {
        return this.pengelolaService.getBlockedDates(user.id, id);
    }

    /**
     * Block specific date
     */
    @Post('venues/:id/block-date')
    async blockDate(
        @CurrentUser() user: any,
        @Param('id', ParseUUIDPipe) id: string,
        @Body() dto: { date: string; reason?: string },
    ) {
        return this.pengelolaService.blockDate(user.id, id, dto);
    }

    /**
     * Unblock date
     */
    @Delete('venues/:id/block-date/:date')
    async unblockDate(
        @CurrentUser() user: any,
        @Param('id', ParseUUIDPipe) id: string,
        @Param('date') date: string,
    ) {
        return this.pengelolaService.unblockDate(user.id, id, date);
    }

    /**
     * Get bookings at my venues
     */
    @Get('bookings')
    async getMyBookings(
        @CurrentUser() user: any,
        @Query('venueId') venueId?: string,
        @Query('status') status?: string,
        @Query('fromDate') fromDate?: string,
        @Query('toDate') toDate?: string,
        @Query('skip') skip?: string,
        @Query('take') take?: string,
    ) {
        return this.pengelolaService.getMyBookings(user.id, {
            venueId,
            status,
            fromDate: fromDate ? new Date(fromDate) : undefined,
            toDate: toDate ? new Date(toDate) : undefined,
            skip: skip ? parseInt(skip) : undefined,
            take: take ? parseInt(take) : undefined,
        });
    }
}
