import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app/app.module';
import * as cookieParser from 'cookie-parser';
import * as bodyParser from 'body-parser';
import Log from './app/Log';
import {
  SwaggerModule,
  SwaggerDocumentOptions,
  DocumentBuilder,
  SwaggerCustomOptions,
} from '@nestjs/swagger';

async function bootstrap() {
  const start = new Date().getTime();
  const app = await NestFactory.create(AppModule);
  const globalPrefix = 'api';
  app.setGlobalPrefix(globalPrefix);
  app.use(cookieParser());
  app.useGlobalPipes(new ValidationPipe());
  app.use(bodyParser.json({ limit: '50mb' }));
  app.use(bodyParser.urlencoded({ limit: '50mb', extended: true }));
  app.enableCors();
  const config = new DocumentBuilder()
    .setTitle('Peepz API')
    .setDescription('The Peepz API description')
    .setVersion('1.0')
    .build();
  const options: SwaggerDocumentOptions = {
    operationIdFactory: (controllerKey: string, methodKey: string) => methodKey,
  };
  const customOptions: SwaggerCustomOptions = {
    swaggerOptions: {
      persistAuthorization: true,
    },
    customSiteTitle: 'Peepz API Docs',
  };
  const document = SwaggerModule.createDocument(app, config, options);
  SwaggerModule.setup('docs', app, document, customOptions);
  const port = process.env.PORT || 3333;
  await app.listen(port, () => {
    const end = new Date().getTime();
    Log.log('main.ts', bootstrap, start, end, {
      message: `Listening at http://localhost:${port}/${globalPrefix}`,
    });
  });
}

bootstrap();
