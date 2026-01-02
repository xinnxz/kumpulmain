/**
 * Payments Controller
 * 
 * Controller untuk endpoint payments:
 * - POST /payments/create - Create payment untuk booking
 * - POST /payments/notification - Midtrans webhook
 * - GET /payments/:bookingId/status - Get payment status
 */

import {
    Controller,
    Get,
    Post,
    Body,
    Param,
    UseGuards,
    ParseUUIDPipe,
    HttpCode,
    HttpStatus,
} from '@nestjs/common';
import { PaymentsService } from './payments.service';
import { CreatePaymentDto } from './dto';
import { JwtAuthGuard } from '../auth/guards';
import { CurrentUser } from '../auth/decorators';

@Controller('payments')
export class PaymentsController {
    constructor(private paymentsService: PaymentsService) { }

    /**
     * Create payment untuk booking
     * Generate Midtrans Snap token
     * 
     * POST /payments/create
     */
    @Post('create')
    @UseGuards(JwtAuthGuard)
    async createPayment(
        @Body() dto: CreatePaymentDto,
        @CurrentUser() user: any,
    ) {
        return this.paymentsService.createPayment(dto.bookingId, user.id);
    }

    /**
     * Midtrans webhook notification
     * Tidak perlu auth karena dari Midtrans server
     * 
     * POST /payments/notification
     */
    @Post('notification')
    @HttpCode(HttpStatus.OK)
    async handleNotification(@Body() notification: any) {
        return this.paymentsService.handleNotification(notification);
    }

    /**
     * Get payment status untuk booking
     * 
     * GET /payments/:bookingId/status
     */
    @Get(':bookingId/status')
    @UseGuards(JwtAuthGuard)
    async getPaymentStatus(
        @Param('bookingId', ParseUUIDPipe) bookingId: string,
        @CurrentUser() user: any,
    ) {
        return this.paymentsService.getPaymentStatus(bookingId, user.id);
    }
}
