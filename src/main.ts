/*
 * @Description: 
 * @Author: FuHang
 * @Date: 2023-07-01 03:51:42
 * @LastEditTime: 2023-07-03 02:31:17
 * @LastEditors: 
 * @FilePath: \nest-service\src\main.ts
 */
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const config = new DocumentBuilder()
    .setTitle('后台管理系统接口文档')
    .setDescription('后台管理系统接口文档')
    .setVersion('1.0')
    .addTag('最佳实践')
    .addBearerAuth()
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api-doc', app, document);

  await app.listen(3000);
}
bootstrap();
