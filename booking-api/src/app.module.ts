/**
 * App Module - KumpulMain.id
 * 
 * Root module yang mengimport semua feature modules.
 */

import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AppController } from './app.controller';
import { AppService } from './app.service';

// Core modules
import { PrismaModule } from './prisma';
import { AuthModule } from './auth';

// Feature modules
import { VenuesModule } from './venues/venues.module';
import { BookingsModule } from './bookings/bookings.module';
import { PaymentsModule } from './payments/payments.module';
import { ChatModule } from './chat/chat.module';

// Role-based modules
import { PengelolaModule } from './pengelola/pengelola.module';
import { AdminModule } from './admin/admin.module';

// Utility modules
import { NotificationsModule } from './notifications/notifications.module';
import { InvitationsModule } from './invitations/invitations.module';

@Module({
  imports: [
    // Load environment variables
    ConfigModule.forRoot({
      isGlobal: true,
    }),

    // Core
    PrismaModule,
    AuthModule,

    // Features
    VenuesModule,
    BookingsModule,
    PaymentsModule,
    ChatModule,

    // Role-based
    PengelolaModule,
    AdminModule,

    // Utilities
    NotificationsModule,
    InvitationsModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { }
