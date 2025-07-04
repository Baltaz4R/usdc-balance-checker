import { NestFactory } from '@nestjs/core';

import { AppModule } from './app/app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.enableCors({ origin: process.env.FRONTEND_ORIGIN });
  app.setGlobalPrefix('api');

  await app.listen(process.env.PORT ?? 3333);
}

bootstrap();
