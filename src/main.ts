import { NestFactory } from '@nestjs/core';
import { ExpressAdapter } from '@nestjs/platform-express';
import * as dotenv from 'dotenv';
import * as express from 'express';
import * as serverless from 'serverless-http';
import { AppModule } from './app.module';

dotenv.config();
const expressApp = express();


async function bootstrap() {
  const app = await NestFactory.create(AppModule, new ExpressAdapter(expressApp));
  



  app.enableCors({
    origin: process.env.FRONTEND_URL, // Your frontend URL
    methods:['GET', 'POST', 'PUT', 'DELETE', 'PATCH', 'OPTIONS'],
    credentials: true,
    //allowedHeaders: 'Content-Type, Authorization',
  });

  await app.listen(3000);
  console.log('Application is running on port 3000');

}
bootstrap();

export const handler = serverless(expressApp);
