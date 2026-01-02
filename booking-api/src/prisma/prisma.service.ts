/**
 * Prisma Service
 * 
 * Service ini menghubungkan NestJS dengan Prisma Client.
 * Digunakan untuk akses database di seluruh aplikasi.
 */

import { Injectable, OnModuleInit, OnModuleDestroy } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';

@Injectable()
export class PrismaService extends PrismaClient implements OnModuleInit, OnModuleDestroy {
  constructor() {
    super({
      log: ['query', 'info', 'warn', 'error'],
    });
  }

  /**
   * Connect to database when module initializes
   */
  async onModuleInit() {
    await this.$connect();
  }

  /**
   * Disconnect from database when module is destroyed
   */
  async onModuleDestroy() {
    await this.$disconnect();
  }
}
