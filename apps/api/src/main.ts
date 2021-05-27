import { Logger, ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app/app.module';
import * as express from 'express';
import * as path from 'path';
import * as cookieParser from 'cookie-parser';
import * as bodyParser from 'body-parser';
import Log from './app/Log';

async function bootstrap() {
  const start = new Date().getTime();
  const app = await NestFactory.create(AppModule);
  app.use(cookieParser());
  app.useGlobalPipes(new ValidationPipe());
  app.use(bodyParser.json({ limit: '50mb' }));
  app.use(bodyParser.urlencoded({ limit: '50mb', extended: true }));
  app.enableCors();
  const globalPrefix = 'api';
  app.setGlobalPrefix(globalPrefix);
  const port = process.env.PORT || 3333;
  app.use('/', express.static(path.join(__dirname, '..', 'peepz')));
  await app.listen(port, () => {
    const end = new Date().getTime();
    Log.log("main.ts",bootstrap, start, end, {
       message:  `Listening at http://localhost:${port}/${globalPrefix}`,
    });
  });
}

bootstrap();
