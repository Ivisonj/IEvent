import * as dotenv from 'dotenv';
dotenv.config();

import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, { cors: true });

  const config = new DocumentBuilder()
    .setTitle('IEvent')
    .setDescription('The IEvent API description')
    .setVersion('1.0')
    .addTag('User')
    .addTag('Event')
    .addTag('Attendance')
    .addTag('Notification')
    .addTag('Event-Log')
    .addTag('Chat')
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);

  await app.listen(3001);
}
bootstrap();
