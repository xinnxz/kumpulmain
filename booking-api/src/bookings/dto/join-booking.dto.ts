/**
 * Join Booking DTO
 * 
 * DTO untuk join ke booking yang sudah ada.
 */

import { IsString, IsNotEmpty } from 'class-validator';

export class JoinBookingDto {
    @IsString()
    @IsNotEmpty({ message: 'Booking ID wajib diisi' })
    bookingId: string;
}
