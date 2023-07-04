/*
 * @Description:
 * @Author: FuHang
 * @Date: 2023-07-04 15:25:10
 * @LastEditTime: 2023-07-04 15:32:24
 * @LastEditors: Please set LastEditors
 * @FilePath: \nest-service\src\setup-swagger.ts
 */
import { INestApplication } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';

export function setupSwagger(app: INestApplication): void {
  const configService: ConfigService = app.get(ConfigService);

  // 默认为启用
  const enable = configService.get<boolean>('swagger.enable', true);

  // 判断是否需要启用
  if (!enable) {
    return;
  }

  const config = new DocumentBuilder()
    .setTitle(configService.get<string>('swagger.title'))
    .setDescription(configService.get<string>('swagger.desc'))
    .setVersion(configService.get<string>('swagger.version'))
    .addBearerAuth()
    // .addSecurity('admin', {
    //   description: '后台管理接口授权',
    //   type: 'apiKey',
    //   in: 'header',
    //   name: 'Authorization',
    // })
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup(configService.get<string>('swagger.path'), app, document);
}
