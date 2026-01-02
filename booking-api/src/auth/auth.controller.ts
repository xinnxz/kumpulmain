/**
 * Auth Controller
 * 
 * Controller untuk endpoints authentication:
 * - POST /auth/register - Registrasi user baru
 * - POST /auth/login - Login user
 * - GET /auth/profile - Get profile user yang login (protected)
 */

import {
    Controller,
    Post,
    Get,
    Body,
    UseGuards,
    HttpCode,
    HttpStatus,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { RegisterDto, LoginDto } from './dto';
import { JwtAuthGuard } from './guards';
import { CurrentUser } from './decorators';

@Controller('auth')
export class AuthController {
    constructor(private authService: AuthService) { }

    /**
     * Register user baru
     * 
     * POST /auth/register
     * Body: { email, password, name, phone? }
     */
    @Post('register')
    async register(@Body() dto: RegisterDto) {
        return this.authService.register(dto);
    }

    /**
     * Login user
     * 
     * POST /auth/login
     * Body: { email, password }
     * Response: { accessToken, user }
     */
    @Post('login')
    @HttpCode(HttpStatus.OK)
    async login(@Body() dto: LoginDto) {
        return this.authService.login(dto);
    }

    /**
     * Get profile user yang sedang login
     * 
     * GET /auth/profile
     * Headers: Authorization: Bearer <token>
     */
    @Get('profile')
    @UseGuards(JwtAuthGuard)
    async getProfile(@CurrentUser() user: any) {
        return this.authService.getProfile(user.id);
    }
}
