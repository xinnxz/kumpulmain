/**
 * Create Payment DTO
 */

import { IsString, IsNotEmpty } from 'class-validator';

export class CreatePaymentDto {
    @IsString()
    @IsNotEmpty({ message: 'Booking ID wajib diisi' })
    bookingId: string;
}
