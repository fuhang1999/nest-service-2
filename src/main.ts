/*
 * @Description:
 * @Author: FuHang
 * @Date: 2023-07-01 03:51:42
 * @LastEditTime: 2023-07-04 15:30:17
 * @LastEditors: Please set LastEditors
 * @FilePath: \nest-service\src\main.ts
 */
import { NestFactory } from '@nestjs/core';
import {
  FastifyAdapter,
  NestFastifyApplication,
} from '@nestjs/platform-fastify';
import { AppModule } from './app.module';
import { Logger } from '@nestjs/common';
import { setupSwagger } from './setup-swagger';

const SERVER_PORT = process.env.SERVER_PORT;

async function bootstrap() {
  const app = await NestFactory.create<NestFastifyApplication>(
    AppModule,
    new FastifyAdapter(),
    { bufferLogs: true },
  );

  // swagger
  setupSwagger(app);
  
  await app.listen(SERVER_PORT, '0.0.0.0');
  const serverUrl = await app.getUrl();
  Logger.log(`api服务已经启动,请访问: ${serverUrl}`);
  Logger.log(`API文档已生成,请访问: ${serverUrl}/${process.env.SWAGGER_PATH}`);
}
bootstrap();
