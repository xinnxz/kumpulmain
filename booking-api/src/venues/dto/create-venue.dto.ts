/**
 * Create Venue DTO
 */

import {
    IsString,
    IsNotEmpty,
    IsOptional,
    IsInt,
    IsArray,
    Min,
    Matches,
} from 'class-validator';

export class CreateVenueDto {
    @IsString()
    @IsNotEmpty({ message: 'Nama venue wajib diisi' })
    name: string;

    @IsString()
    @IsOptional()
    description?: string;

    @IsString()
    @IsNotEmpty({ message: 'Alamat wajib diisi' })
    address: string;

    @IsInt()
    @Min(0, { message: 'Harga tidak boleh negatif' })
    pricePerHour: number;

    @IsInt()
    @Min(1, { message: 'Kapasitas minimal 1 orang' })
    capacity: number;

    @IsArray()
    @IsString({ each: true })
    @IsOptional()
    images?: string[];

    @IsArray()
    @IsString({ each: true })
    @IsOptional()
    facilities?: string[];

    @Matches(/^([01]\d|2[0-3]):([0-5]\d)$/, {
        message: 'Format waktu harus HH:mm'
    })
    @IsOptional()
    openTime?: string;

    @Matches(/^([01]\d|2[0-3]):([0-5]\d)$/, {
        message: 'Format waktu harus HH:mm'
    })
    @IsOptional()
    closeTime?: string;
}
