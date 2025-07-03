import { NestFactory } from '@nestjs/core';
import { AuthModule } from './auth.module';
import { ValidationPipe, Logger } from '@nestjs/common';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import * as dotenv from 'dotenv';

dotenv.config();

async function bootstrap() {
  const app = await NestFactory.create(AuthModule);

  app.enableCors();
  app.useGlobalPipes(new ValidationPipe());
  app.setGlobalPrefix('api');

  const config = new DocumentBuilder()
    .setTitle('Auth Service API')
    .setDescription('Authentication Microservice')
    .setVersion('1.0')
    .addTag('Auth')
    .addBearerAuth({
      type: 'http',
      scheme: 'bearer',
      bearerFormat: 'JWT',
      in: 'header',
    })
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('auth/api-docs', app, document);

  const port = process.env.AUTH_PORT || 1000;
  await app.listen(port);

  Logger.log(
    `🚀 Auth service running on: http://localhost:${port}/auth/api-docs`,
  );
}
bootstrap();
