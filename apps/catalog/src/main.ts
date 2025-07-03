import { NestFactory } from '@nestjs/core';
import { CatalogModule } from './catalog.module';
import { ValidationPipe, Logger } from '@nestjs/common';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import * as dotenv from 'dotenv';

dotenv.config();

async function bootstrap() {
  const app = await NestFactory.create(CatalogModule);

  app.enableCors();
  app.useGlobalPipes(new ValidationPipe());
  app.setGlobalPrefix('api');

  const config = new DocumentBuilder()
    .setTitle('Catalog Service API')
    .setDescription('Catalog Microservice')
    .setVersion('1.0')
    .addTag('Catalog')
    .addBearerAuth({
      type: 'http',
      scheme: 'bearer',
      bearerFormat: 'JWT',
      in: 'header',
    })
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('catalog/api-docs', app, document);

  const port = process.env.CATALOG_PORT || 1001;
  await app.listen(port);

  Logger.log(
    `🚀 Catalog service running on: http://localhost:${port}/catalog/api-docs`,
  );
}
bootstrap();
