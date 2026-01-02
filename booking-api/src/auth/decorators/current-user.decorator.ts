/**
 * Current User Decorator
 * 
 * Decorator untuk mendapatkan user yang sedang login dari request.
 * 
 * Contoh penggunaan:
 * @Get('profile')
 * getProfile(@CurrentUser() user: User) { ... }
 */

import { createParamDecorator, ExecutionContext } from '@nestjs/common';

export const CurrentUser = createParamDecorator(
    (data: unknown, ctx: ExecutionContext) => {
        const request = ctx.switchToHttp().getRequest();
        return request.user;
    },
);
