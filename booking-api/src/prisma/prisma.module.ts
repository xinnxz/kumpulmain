/**
 * Prisma Module
 * 
 * Module global yang menyediakan PrismaService
 * ke seluruh aplikasi NestJS.
 */

import { Global, Module } from '@nestjs/common';
import { PrismaService } from './prisma.service';

@Global() // Membuat module ini tersedia secara global
@Module({
    providers: [PrismaService],
    exports: [PrismaService],
})
export class PrismaModule { }
