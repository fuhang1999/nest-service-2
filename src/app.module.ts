/*
 * @Description:
 * @Author: FuHang
 * @Date: 2023-07-01 03:51:42
 * @LastEditTime: 2023-07-04 21:54:28
 * @LastEditors: Please set LastEditors
 * @FilePath: \nest-service\src\app.module.ts
 */
// import { TypeOrmConfig } from './common/config/database.db';
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { UserModule } from './modules/user/user.module';
import { RoleModule } from './modules/role/role.module';
import { AuthModule } from './modules/auth/auth.module';
import { UploadModule } from './modules/upload/upload.module';
import { MenuModule } from './modules/menu/menu.module';
import { getConfiguration } from './common/config/configuration';
import { APP_FILTER, APP_INTERCEPTOR } from '@nestjs/core';
import { ResponseInterceptor } from './interceptors/response.interceptor';
import { AnyExceptionFilter } from './filters/any-exception.filter';
import { HttpExceptionFilter } from './filters/http-exception.filter';
import { WinstonModule } from 'nest-winston';
import { WinstonConfig } from './common/config/winston.config';

@Module({
  imports: [
    WinstonModule.forRoot(WinstonConfig),
    // 配置全局的环境变量
    ConfigModule.forRoot({
      isGlobal: true,
      load: [getConfiguration],
      envFilePath: [`.env.${process.env.NODE_ENV}`, '.env'],
    }),
    // 连接MySQL
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: (configService: ConfigService) => ({
        // 自动加载实体
        autoLoadEntities: true,
        type: configService.get<any>('database.type'),
        host: configService.get<string>('database.host'),
        port: configService.get<number>('database.port'),
        username: configService.get<string>('database.username'),
        password: configService.get<string>('database.password'),
        database: configService.get<string>('database.database'),
        synchronize: configService.get<boolean>('database.synchronize'),
        timezone: configService.get('database.timezone'), // 时区
      }),
      inject: [ConfigService],
    }),
    AuthModule,
    UserModule,
    RoleModule,
    UploadModule,
    MenuModule,
  ],
  controllers: [],
  providers: [
    // 应用拦截器
    {
      provide: APP_INTERCEPTOR,
      useClass: ResponseInterceptor,
    },
    // 应用全局过滤器
    {
      provide: APP_FILTER,
      useClass: AnyExceptionFilter,
    },
    {
      provide: APP_FILTER,
      useClass: HttpExceptionFilter,
    },
  ],
})
export class AppModule {}
