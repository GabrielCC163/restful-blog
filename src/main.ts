import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

import * as dotenv from 'dotenv';
import { setupSwagger } from '@config/swagger.config';
import { ConfigService } from '@nestjs/config';
import { AppConfig } from '@config/app.config';
dotenv.config();

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const config = app.get<ConfigService<AppConfig, true>>(ConfigService);
  const applicationName = config.get<AppConfig['app_name']>('app_name');

  app.enableCors();
  app.useGlobalPipes(new ValidationPipe({ transform: true, whitelist: true }));

  setupSwagger(applicationName, app);
  await app.listen(process.env.PORT || 3001).then(() => {
    console.log('HTTP server running!');
  });
}

bootstrap().catch((err) => {
  console.error(err);
  process.exit(1);
});
