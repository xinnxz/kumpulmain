/**
 * Bookings Controller
 * 
 * Controller untuk endpoint bookings:
 * - POST /bookings - Create booking baru
 * - POST /bookings/join - Join booking yang ada
 * - POST /bookings/:id/leave - Leave dari booking
 * - POST /bookings/:id/cancel - Cancel booking (owner)
 * - GET /bookings/open - List booking yang bisa di-join
 * - GET /bookings/my - List booking milik user
 * - GET /bookings/:id - Get booking detail
 */

import {
    Controller,
    Get,
    Post,
    Body,
    Param,
    Query,
    UseGuards,
    ParseUUIDPipe,
} from '@nestjs/common';
import { BookingsService } from './bookings.service';
import { CreateBookingDto, JoinBookingDto } from './dto';
import { JwtAuthGuard } from '../auth/guards';
import { CurrentUser } from '../auth/decorators';
import { BookingStatus } from '@prisma/client';

@Controller('bookings')
@UseGuards(JwtAuthGuard)
export class BookingsController {
    constructor(private bookingsService: BookingsService) { }

    /**
     * Create booking baru
     * 
     * POST /bookings
     */
    @Post()
    async create(
        @Body() dto: CreateBookingDto,
        @CurrentUser() user: any,
    ) {
        return this.bookingsService.create(dto, user.id);
    }

    /**
     * Join booking yang ada
     * 
     * POST /bookings/join
     */
    @Post('join')
    async join(
        @Body() dto: JoinBookingDto,
        @CurrentUser() user: any,
    ) {
        return this.bookingsService.joinBooking(dto.bookingId, user.id);
    }

    /**
     * Leave dari booking
     * 
     * POST /bookings/:id/leave
     */
    @Post(':id/leave')
    async leave(
        @Param('id', ParseUUIDPipe) id: string,
        @CurrentUser() user: any,
    ) {
        return this.bookingsService.leaveBooking(id, user.id);
    }

    /**
     * Cancel booking (owner only)
     * 
     * POST /bookings/:id/cancel
     */
    @Post(':id/cancel')
    async cancel(
        @Param('id', ParseUUIDPipe) id: string,
        @CurrentUser() user: any,
    ) {
        return this.bookingsService.cancelBooking(id, user.id);
    }

    /**
     * List booking yang bisa di-join
     * 
     * GET /bookings/open?skip=0&take=10&venueId=xxx&date=2026-01-15
     */
    @Get('open')
    async findOpen(
        @Query('skip') skip?: string,
        @Query('take') take?: string,
        @Query('venueId') venueId?: string,
        @Query('date') dateStr?: string,
    ) {
        return this.bookingsService.findOpenBookings({
            skip: skip ? parseInt(skip) : undefined,
            take: take ? parseInt(take) : undefined,
            venueId,
            date: dateStr ? new Date(dateStr) : undefined,
        });
    }

    /**
     * List booking milik user (sebagai owner atau participant)
     * 
     * GET /bookings/my?status=PENDING
     */
    @Get('my')
    async findMy(
        @CurrentUser() user: any,
        @Query('status') status?: BookingStatus,
    ) {
        return this.bookingsService.findMyBookings(user.id, status);
    }

    /**
     * Get booking detail
     * 
     * GET /bookings/:id
     */
    @Get(':id')
    async findOne(@Param('id', ParseUUIDPipe) id: string) {
        return this.bookingsService.findOne(id);
    }
}
