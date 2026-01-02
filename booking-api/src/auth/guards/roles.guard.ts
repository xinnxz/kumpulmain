/**
 * Roles Guard
 * 
 * Guard untuk membatasi akses berdasarkan role user.
 * Gunakan bersama dengan @Roles() decorator.
 */

import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { Role } from '@prisma/client';
import { ROLES_KEY } from '../decorators/roles.decorator';

@Injectable()
export class RolesGuard implements CanActivate {
    constructor(private reflector: Reflector) { }

    canActivate(context: ExecutionContext): boolean {
        // Ambil roles yang dibutuhkan dari metadata
        const requiredRoles = this.reflector.getAllAndOverride<Role[]>(ROLES_KEY, [
            context.getHandler(),
            context.getClass(),
        ]);

        // Jika tidak ada roles decorator, allow access
        if (!requiredRoles) {
            return true;
        }

        // Ambil user dari request (sudah di-attach oleh JwtStrategy)
        const { user } = context.switchToHttp().getRequest();

        // Check apakah user role ada di required roles
        return requiredRoles.some((role) => user.role === role);
    }
}
