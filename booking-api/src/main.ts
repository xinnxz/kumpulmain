/**
 * Main Entry Point
 * 
 * Bootstrap aplikasi NestJS dengan konfigurasi:
 * - CORS untuk frontend
 * - Validation pipe untuk DTOs
 * - Port dari environment variable
 */

import { NestFactory } from '@nestjs/core';
import { ValidationPipe } from '@nestjs/common';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // Enable CORS untuk frontend
  app.enableCors({
    origin: [
      process.env.FRONTEND_URL || 'http://localhost:3000',
      'http://localhost:3002',
      'http://localhost:3003',
    ],
    credentials: true,
  });

  // Global validation pipe untuk semua DTOs
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,           // Strip unknown properties
      forbidNonWhitelisted: true, // Throw error for unknown properties
      transform: true,           // Auto-transform payloads to DTO instances
    }),
  );

  // API prefix
  app.setGlobalPrefix('api');

  const port = process.env.PORT || 3001;
  await app.listen(port);

  console.log(`🚀 Booking API running on http://localhost:${port}`);
}

bootstrap();
