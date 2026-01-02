/**
 * Auth Service
 * 
 * Service untuk menangani authentication logic:
 * - Register: Membuat user baru dengan password ter-hash
 * - Login: Validasi kredensial dan generate JWT token
 * - Profile: Mendapatkan data user yang sedang login
 */

import {
    Injectable,
    UnauthorizedException,
    ConflictException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { PrismaService } from '../prisma/prisma.service';
import { RegisterDto, LoginDto } from './dto';
import { JwtPayload } from './strategies/jwt.strategy';

@Injectable()
export class AuthService {
    constructor(
        private prisma: PrismaService,
        private jwtService: JwtService,
    ) { }

    /**
     * Register user baru
     * 
     * 1. Check apakah email sudah terdaftar
     * 2. Hash password dengan bcrypt
     * 3. Create user di database
     * 4. Return user data (tanpa password)
     */
    async register(dto: RegisterDto) {
        // Check email sudah ada atau belum
        const existingUser = await this.prisma.user.findUnique({
            where: { email: dto.email },
        });

        if (existingUser) {
            throw new ConflictException('Email sudah terdaftar');
        }

        // Hash password
        const saltRounds = 10;
        const hashedPassword = await bcrypt.hash(dto.password, saltRounds);

        // Create user
        const user = await this.prisma.user.create({
            data: {
                email: dto.email,
                password: hashedPassword,
                name: dto.name,
                phone: dto.phone,
            },
            select: {
                id: true,
                email: true,
                name: true,
                phone: true,
                role: true,
                createdAt: true,
            },
        });

        return {
            message: 'Registrasi berhasil',
            user,
        };
    }

    /**
     * Login user
     * 
     * 1. Find user by email
     * 2. Validate password dengan bcrypt
     * 3. Generate JWT token
     */
    async login(dto: LoginDto) {
        // Find user by email
        const user = await this.prisma.user.findUnique({
            where: { email: dto.email },
        });

        if (!user) {
            throw new UnauthorizedException('Email atau password salah');
        }

        // Check if user is active
        if (!user.isActive) {
            throw new UnauthorizedException('Akun tidak aktif');
        }

        // Validate password
        const isPasswordValid = await bcrypt.compare(dto.password, user.password);

        if (!isPasswordValid) {
            throw new UnauthorizedException('Email atau password salah');
        }

        // Generate JWT token
        const payload: JwtPayload = {
            sub: user.id,
            email: user.email,
            role: user.role,
        };

        const accessToken = this.jwtService.sign(payload);

        return {
            message: 'Login berhasil',
            accessToken,
            user: {
                id: user.id,
                email: user.email,
                name: user.name,
                role: user.role,
            },
        };
    }

    /**
     * Get profile user yang sedang login
     */
    async getProfile(userId: string) {
        const user = await this.prisma.user.findUnique({
            where: { id: userId },
            select: {
                id: true,
                email: true,
                name: true,
                phone: true,
                avatar: true,
                role: true,
                createdAt: true,
            },
        });

        return user;
    }
}
