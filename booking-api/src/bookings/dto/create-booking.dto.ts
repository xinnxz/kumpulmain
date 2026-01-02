/**
 * Create Booking DTO
 * 
 * DTO untuk membuat booking baru dengan opsi joinan (main bareng).
 */

import {
    IsString,
    IsNotEmpty,
    IsOptional,
    IsInt,
    IsBoolean,
    IsDateString,
    IsEnum,
    Min,
    Max,
    Matches,
    MaxLength,
} from 'class-validator';

export enum InviteTypeDto {
    PUBLIC = 'PUBLIC',
    PRIVATE = 'PRIVATE',
}

export class CreateBookingDto {
    @IsString()
    @IsNotEmpty({ message: 'Venue ID wajib diisi' })
    venueId: string;

    @IsDateString({}, { message: 'Format tanggal tidak valid' })
    @IsNotEmpty({ message: 'Tanggal booking wajib diisi' })
    date: string; // Format: YYYY-MM-DD

    @Matches(/^([01]\d|2[0-3]):([0-5]\d)$/, {
        message: 'Format waktu mulai harus HH:mm'
    })
    @IsNotEmpty({ message: 'Waktu mulai wajib diisi' })
    startTime: string;

    @Matches(/^([01]\d|2[0-3]):([0-5]\d)$/, {
        message: 'Format waktu selesai harus HH:mm'
    })
    @IsNotEmpty({ message: 'Waktu selesai wajib diisi' })
    endTime: string;

    // Joinan options
    @IsBoolean()
    @IsOptional()
    isJoinable?: boolean; // Apakah bisa di-join orang lain?

    @IsInt()
    @Min(2, { message: 'Minimal 2 slot untuk joinan' })
    @Max(20, { message: 'Maksimal 20 slot' })
    @IsOptional()
    maxSlots?: number; // Jumlah maksimal peserta (termasuk owner)

    @IsEnum(InviteTypeDto, { message: 'inviteType harus PUBLIC atau PRIVATE' })
    @IsOptional()
    inviteType?: InviteTypeDto; // PUBLIC atau PRIVATE

    @IsString()
    @MaxLength(100)
    @IsOptional()
    title?: string; // Judul undangan, misal "Main Futsal Bareng"

    @IsDateString()
    @IsOptional()
    joinDeadline?: string; // Deadline untuk join

    @IsString()
    @MaxLength(500)
    @IsOptional()
    notes?: string;
}
