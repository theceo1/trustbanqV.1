//backend/src/main.ts
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { HttpExceptionFilter } from './common/filters/http-exception.filter';
import { ValidationPipe } from '@nestjs/common';
import { LoggerService } from './common/services/logger.service';
import { ConfigService } from '@nestjs/config'; // Import ConfigService
import { initializeSupabase } from './supabaseClient'; // Import the initialize function

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    logger: new LoggerService(),
  });
  app.setGlobalPrefix('api');

  // Use global exception filter for handling errors
  app.useGlobalFilters(new HttpExceptionFilter());

  // Enable global validation pipe
  app.useGlobalPipes(new ValidationPipe({
    transform: true, // Automatically transform payloads to DTO instances
    whitelist: true, // Strip properties that do not have decorators
    forbidNonWhitelisted: true, // Reject requests with non-whitelisted properties
  }));

  const allowedOrigins = [
    'http://localhost:3000',
    'https://trustbank1.vercel.app',
    process.env.FRONTEND_URL,
  ].filter((origin): origin is string => !!origin);

  app.enableCors({
    origin: allowedOrigins,
    credentials: true,
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization'],
  });

  // Initialize Supabase
  const configService = app.get(ConfigService); // Get the ConfigService instance
  initializeSupabase(configService); // Call the initialize function

  const port = process.env.PORT || 5001;
  await app.listen(port);
  console.log(`Application is running on port ${port}`);
  console.log(`Allowed origins: ${allowedOrigins.join(', ')}`);
}
bootstrap();