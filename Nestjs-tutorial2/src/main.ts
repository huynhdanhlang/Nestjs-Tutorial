import { HttpAdapterHost, NestFactory, Reflector } from '@nestjs/core';
import { AppModule } from './app.module';
import * as cookieParser from 'cookie-parser';
import { ExceptionsLoggerFilter } from './utils/exceptionsLogger.filter';
import { ClassSerializerInterceptor, ValidationPipe } from '@nestjs/common';
import { config } from 'aws-sdk';
import { ConfigService } from '@nestjs/config';
import { ExcludeNullInterceptor } from './utils/excludeNull.interceptor';
import { runInCluster } from './utils/runInCluster';
import rawBodyMiddleware from './utils/rawBody.middleware';
import getLogLevels from './utils/getLogLevels';
import CustomLogger from './logger/customLogger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    bufferLogs: true,
  });

  app.useLogger(app.get(CustomLogger));

  const configService = app.get(ConfigService);
  app.use(cookieParser());

  // const { httpAdapter } = app.get(HttpAdapterHost);
  // app.useGlobalFilters(new ExceptionsLoggerFilter(httpAdapter));
  app.enableCors({
    origin: configService.get('FRONTEND_URL'),
    credentials: true,
  });
  app.useGlobalPipes(
    new ValidationPipe({
      transform: true,
    }),
  );
  // app.useGlobalInterceptors(new ExcludeNullInterceptor());

  config.update({
    accessKeyId: configService.get('ASW_ACCESS_KEY_ID'),
    secretAccessKey: configService.get('AWS_SECRET_ACCESS_KEY'),
    region: configService.get('AWS_REGION'),
  });
  app.use(rawBodyMiddleware());

  // app.useGlobalInterceptors(new ClassSerializerInterceptor(app.get(Reflector)));
  await app.listen(3000);
}
runInCluster(bootstrap);
