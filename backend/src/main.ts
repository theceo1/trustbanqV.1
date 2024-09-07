//backend/src/main.ts
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { HttpExceptionFilter } from './common/filters/http-exception.filter';
import { ValidationPipe } from '@nestjs/common';
import { LoggerService } from './common/services/logger.service';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    logger: new LoggerService(),
  });
  app.setGlobalPrefix('api');

  app.useGlobalFilters(new HttpExceptionFilter());
  app.useGlobalPipes(new ValidationPipe());

  app.enableCors({
    origin: process.env.FRONTEND_URL || 'http://localhost:3000' || 'https://trustbank1.vercel.app',
    credentials: true,
  });

  // Remove the port variable and use 3000 as default
  await app.listen(process.env.PORT || 3000);
  
  // Log the actual URL, not localhost
  app.get(LoggerService).log(`Application is running`);
}
bootstrap();