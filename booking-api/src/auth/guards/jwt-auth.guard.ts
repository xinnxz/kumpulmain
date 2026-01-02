/**
 * JWT Auth Guard
 * 
 * Guard untuk melindungi routes yang membutuhkan authentication.
 * Cukup tambahkan @UseGuards(JwtAuthGuard) di controller.
 */

import { Injectable } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

@Injectable()
export class JwtAuthGuard extends AuthGuard('jwt') { }
