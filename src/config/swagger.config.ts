import { INestApplication } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
import * as packageJSON from '../../package.json';
import { AppConfig } from './app.config';

/**
 * Setup swagger module.
 * @param name Document title
 * @param app Nest Application
 */
export const setupSwagger = (name: string, app: INestApplication) => {
  const configService = app.get<ConfigService<AppConfig, true>>(ConfigService);
  const baseUrl = configService.get('base_url');
  const appEnv = configService.get('app_env');
  const appName = configService.get('app_name');

  const config = new DocumentBuilder()
    .setTitle(name)
    .setVersion(packageJSON.version)
    .addServer(baseUrl, `${appName} - ${appEnv}`)
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('docs', app, document, {
    swaggerOptions: {
      tagsSorter: 'alpha',
      operationsSorter: 'alpha',
    },
    url: baseUrl,
  });
};
