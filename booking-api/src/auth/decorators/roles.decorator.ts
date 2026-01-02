/**
 * Roles Decorator
 * 
 * Decorator untuk menentukan roles yang diizinkan mengakses endpoint.
 * Digunakan bersama dengan RolesGuard.
 * 
 * Contoh penggunaan:
 * @Roles(Role.ADMIN)
 * @UseGuards(JwtAuthGuard, RolesGuard)
 */

import { SetMetadata } from '@nestjs/common';
import { Role } from '@prisma/client';

export const ROLES_KEY = 'roles';
export const Roles = (...roles: Role[]) => SetMetadata(ROLES_KEY, roles);
