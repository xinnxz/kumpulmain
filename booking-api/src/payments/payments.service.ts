/**
 * Payments Service
 * 
 * Service untuk integrasi pembayaran dengan Midtrans.
 * 
 * Flow:
 * 1. User minta create payment untuk booking mereka
 * 2. Generate Midtrans Snap token
 * 3. User bayar via Snap popup
 * 4. Midtrans kirim notification ke webhook
 * 5. Update payment status dan check booking status
 */

import {
    Injectable,
    NotFoundException,
    BadRequestException,
} from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { BookingsService } from '../bookings/bookings.service';
import { PaymentStatus } from '@prisma/client';
import { v4 as uuidv4 } from 'uuid';

// Midtrans types
interface MidtransSnapResponse {
    token: string;
    redirect_url: string;
}

interface MidtransNotification {
    transaction_time: string;
    transaction_status: string;
    transaction_id: string;
    status_message: string;
    status_code: string;
    signature_key: string;
    payment_type: string;
    order_id: string;
    merchant_id: string;
    gross_amount: string;
    fraud_status: string;
    currency: string;
}

@Injectable()
export class PaymentsService {
    private midtransSnap: any;
    private midtransCore: any;

    constructor(
        private prisma: PrismaService,
        private bookingsService: BookingsService,
    ) {
        // Initialize Midtrans
        // eslint-disable-next-line @typescript-eslint/no-require-imports
        const midtransClient = require('midtrans-client');

        const isProduction = process.env.MIDTRANS_IS_PRODUCTION === 'true';

        this.midtransSnap = new midtransClient.Snap({
            isProduction,
            serverKey: process.env.MIDTRANS_SERVER_KEY,
            clientKey: process.env.MIDTRANS_CLIENT_KEY,
        });

        this.midtransCore = new midtransClient.CoreApi({
            isProduction,
            serverKey: process.env.MIDTRANS_SERVER_KEY,
            clientKey: process.env.MIDTRANS_CLIENT_KEY,
        });
    }

    /**
     * Create payment untuk booking
     * Generate Midtrans Snap token
     */
    async createPayment(bookingId: string, userId: string) {
        // Get booking and participant
        const booking = await this.prisma.booking.findUnique({
            where: { id: bookingId },
            include: {
                venue: true,
                participants: {
                    where: { userId },
                    include: {
                        user: true,
                        payment: true,
                    },
                },
            },
        });

        if (!booking) {
            throw new NotFoundException('Booking tidak ditemukan');
        }

        const participant = booking.participants[0];
        if (!participant) {
            throw new BadRequestException('Anda bukan peserta booking ini');
        }

        // Check if already paid
        if (participant.paymentStatus === PaymentStatus.PAID) {
            throw new BadRequestException('Anda sudah membayar');
        }

        // Check if payment already exists and pending
        if (participant.payment && participant.payment.status === 'pending') {
            // Return existing snap token
            return {
                snapToken: participant.payment.snapToken,
                orderId: participant.payment.midtransOrderId,
                amount: participant.payment.amount,
            };
        }

        // Generate unique order ID
        const orderId = `BOOK-${bookingId.slice(0, 8)}-${userId.slice(0, 8)}-${Date.now()}`;

        // Create Midtrans transaction
        const parameter = {
            transaction_details: {
                order_id: orderId,
                gross_amount: participant.shareAmount,
            },
            item_details: [
                {
                    id: booking.venueId,
                    price: participant.shareAmount,
                    quantity: 1,
                    name: `Booking ${booking.venue.name}`,
                },
            ],
            customer_details: {
                first_name: participant.user.name,
                email: participant.user.email,
                phone: participant.user.phone || '',
            },
            callbacks: {
                finish: `${process.env.FRONTEND_URL}/bookings/${bookingId}`,
            },
        };

        try {
            const transaction: MidtransSnapResponse = await this.midtransSnap.createTransaction(parameter);

            // Save payment record
            const payment = await this.prisma.payment.upsert({
                where: { participantId: participant.id },
                update: {
                    midtransOrderId: orderId,
                    snapToken: transaction.token,
                    amount: participant.shareAmount,
                    status: 'pending',
                },
                create: {
                    participantId: participant.id,
                    midtransOrderId: orderId,
                    snapToken: transaction.token,
                    amount: participant.shareAmount,
                    status: 'pending',
                    expiredAt: new Date(Date.now() + 24 * 60 * 60 * 1000), // 24 hours
                },
            });

            // Update participant status to PENDING
            await this.prisma.bookingParticipant.update({
                where: { id: participant.id },
                data: { paymentStatus: PaymentStatus.PENDING },
            });

            return {
                snapToken: transaction.token,
                redirectUrl: transaction.redirect_url,
                orderId,
                amount: participant.shareAmount,
            };
        } catch (error) {
            console.error('Midtrans error:', error);
            throw new BadRequestException('Gagal membuat transaksi pembayaran');
        }
    }

    /**
     * Handle Midtrans webhook notification
     */
    async handleNotification(notification: MidtransNotification) {
        const orderId = notification.order_id;
        const transactionStatus = notification.transaction_status;
        const fraudStatus = notification.fraud_status;
        const paymentType = notification.payment_type;
        const transactionId = notification.transaction_id;

        console.log('Payment notification received:', {
            orderId,
            transactionStatus,
            fraudStatus,
        });

        // Find payment by order ID
        const payment = await this.prisma.payment.findUnique({
            where: { midtransOrderId: orderId },
            include: {
                participant: true,
            },
        });

        if (!payment) {
            console.error('Payment not found for order:', orderId);
            return { status: 'payment not found' };
        }

        // Determine new status based on transaction status
        let newStatus = payment.status;
        let participantPaymentStatus = payment.participant.paymentStatus;
        let paidAt: Date | null = null;

        if (transactionStatus === 'capture') {
            if (fraudStatus === 'accept') {
                newStatus = 'settlement';
                participantPaymentStatus = PaymentStatus.PAID;
                paidAt = new Date();
            }
        } else if (transactionStatus === 'settlement') {
            newStatus = 'settlement';
            participantPaymentStatus = PaymentStatus.PAID;
            paidAt = new Date();
        } else if (
            transactionStatus === 'cancel' ||
            transactionStatus === 'deny' ||
            transactionStatus === 'expire'
        ) {
            newStatus = transactionStatus;
            participantPaymentStatus = PaymentStatus.UNPAID;
        } else if (transactionStatus === 'pending') {
            newStatus = 'pending';
            participantPaymentStatus = PaymentStatus.PENDING;
        }

        // Update payment and participant in transaction
        await this.prisma.$transaction(async (tx) => {
            await tx.payment.update({
                where: { id: payment.id },
                data: {
                    status: newStatus,
                    paymentType,
                    transactionId,
                    paidAt,
                    rawResponse: notification as any,
                },
            });

            await tx.bookingParticipant.update({
                where: { id: payment.participant.id },
                data: { paymentStatus: participantPaymentStatus },
            });
        });

        // If payment successful, check and update booking status
        if (participantPaymentStatus === PaymentStatus.PAID) {
            await this.bookingsService.checkAndUpdateStatus(payment.participant.bookingId);
        }

        return { status: 'ok' };
    }

    /**
     * Get payment status
     */
    async getPaymentStatus(bookingId: string, userId: string) {
        const participant = await this.prisma.bookingParticipant.findUnique({
            where: {
                bookingId_userId: { bookingId, userId },
            },
            include: {
                payment: true,
            },
        });

        if (!participant) {
            throw new NotFoundException('Anda bukan peserta booking ini');
        }

        return {
            paymentStatus: participant.paymentStatus,
            payment: participant.payment,
        };
    }

    /**
     * Check transaction status from Midtrans
     */
    async checkTransactionStatus(orderId: string) {
        try {
            const status = await this.midtransCore.transaction.status(orderId);
            return status;
        } catch (error) {
            console.error('Error checking transaction status:', error);
            throw new BadRequestException('Gagal mengecek status transaksi');
        }
    }
}
