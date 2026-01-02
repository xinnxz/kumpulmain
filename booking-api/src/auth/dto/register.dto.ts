/**
 * Register DTO
 * 
 * Data Transfer Object untuk registrasi user baru.
 * Menggunakan class-validator untuk validasi input.
 */

import { IsEmail, IsNotEmpty, IsOptional, IsString, MinLength } from 'class-validator';

export class RegisterDto {
    @IsEmail({}, { message: 'Email tidak valid' })
    @IsNotEmpty({ message: 'Email wajib diisi' })
    email: string;

    @IsString()
    @MinLength(6, { message: 'Password minimal 6 karakter' })
    @IsNotEmpty({ message: 'Password wajib diisi' })
    password: string;

    @IsString()
    @IsNotEmpty({ message: 'Nama wajib diisi' })
    name: string;

    @IsString()
    @IsOptional()
    phone?: string;
}
