import { HttpAdapterHost, NestFactory } from '@nestjs/core';
import {
  FastifyAdapter,
  NestFastifyApplication,
} from '@nestjs/platform-fastify';
import { ConfigService } from '@nestjs/config';
import { CONFIG_NAME, IAppConfig } from 'src/config/config.interface';
import { Logger, ValidationPipe } from '@nestjs/common';
import { AppModule } from '@app/app.module';
import { WinstonModule } from 'nest-winston';
import { winstonConfig } from '@app/utility/logger/logger';
import { setupSwagger } from '@app/general/setupSwagger';
import validationOptions from '@app/utility/validation/validation.options';
import { HttpExceptionFilter } from '@app/utility/error/errorHandler';
import { PrismaClientExceptionFilter } from 'nestjs-prisma';

async function bootstrap() {
  const app = await NestFactory.create<NestFastifyApplication>(
    AppModule,
    new FastifyAdapter(),
    {
      logger: WinstonModule.createLogger(winstonConfig),
    },
  );
  const adapterHost = app.get(HttpAdapterHost);
  const httpAdapter = adapterHost.httpAdapter;
  app.useGlobalPipes(new ValidationPipe(validationOptions));
  app.useGlobalFilters(new PrismaClientExceptionFilter(httpAdapter));
  app.useGlobalFilters(new HttpExceptionFilter());
  const config = app.get<ConfigService>(ConfigService);
  await setupSwagger(app);

  await app.listen(
    {
      port: config.get<IAppConfig>(CONFIG_NAME.APP_CONFIG)?.appPort || 3000,
      host: '0.0.0.0',
    },
    () =>
      Logger.log(
        `App started successfully on port ${config.get<IAppConfig>(CONFIG_NAME.APP_CONFIG)?.appPort}`,
      ),
  );
}
bootstrap();
