/**
 * Admin Controller
 * 
 * Controller untuk admin dashboard endpoints (Admin only):
 * - GET /admin/dashboard - Get dashboard stats
 * - GET /admin/users - Get all users
 * - GET /admin/bookings - Get all bookings
 * - GET /admin/payments - Get payment reports
 * - PATCH /admin/bookings/:id/status - Update booking status
 * - PATCH /admin/users/:id/toggle - Toggle user active status
 */

import {
    Controller,
    Get,
    Patch,
    Param,
    Query,
    Body,
    UseGuards,
    ParseUUIDPipe,
} from '@nestjs/common';
import { AdminService } from './admin.service';
import { JwtAuthGuard, RolesGuard } from '../auth/guards';
import { Roles } from '../auth/decorators';
import { Role, BookingStatus } from '@prisma/client';

@Controller('admin')
@UseGuards(JwtAuthGuard, RolesGuard)
@Roles(Role.ADMIN)
export class AdminController {
    constructor(private adminService: AdminService) { }

    /**
     * Get dashboard statistics
     */
    @Get('dashboard')
    async getDashboard() {
        return this.adminService.getDashboardStats();
    }

    /**
     * Get all users
     */
    @Get('users')
    async getUsers(
        @Query('skip') skip?: string,
        @Query('take') take?: string,
        @Query('search') search?: string,
        @Query('role') role?: Role,
    ) {
        return this.adminService.getUsers({
            skip: skip ? parseInt(skip) : undefined,
            take: take ? parseInt(take) : undefined,
            search,
            role,
        });
    }

    /**
     * Get all bookings
     */
    @Get('bookings')
    async getBookings(
        @Query('skip') skip?: string,
        @Query('take') take?: string,
        @Query('status') status?: BookingStatus,
        @Query('venueId') venueId?: string,
        @Query('fromDate') fromDate?: string,
        @Query('toDate') toDate?: string,
    ) {
        return this.adminService.getBookings({
            skip: skip ? parseInt(skip) : undefined,
            take: take ? parseInt(take) : undefined,
            status,
            venueId,
            fromDate: fromDate ? new Date(fromDate) : undefined,
            toDate: toDate ? new Date(toDate) : undefined,
        });
    }

    /**
     * Get payment reports
     */
    @Get('payments')
    async getPayments(
        @Query('fromDate') fromDate?: string,
        @Query('toDate') toDate?: string,
        @Query('status') status?: string,
    ) {
        return this.adminService.getPaymentReports({
            fromDate: fromDate ? new Date(fromDate) : undefined,
            toDate: toDate ? new Date(toDate) : undefined,
            status,
        });
    }

    /**
     * Update booking status
     */
    @Patch('bookings/:id/status')
    async updateBookingStatus(
        @Param('id', ParseUUIDPipe) id: string,
        @Body('status') status: BookingStatus,
    ) {
        return this.adminService.updateBookingStatus(id, status);
    }

    /**
     * Toggle user active status
     */
    @Patch('users/:id/toggle')
    async toggleUserStatus(@Param('id', ParseUUIDPipe) id: string) {
        return this.adminService.toggleUserStatus(id);
    }
}
