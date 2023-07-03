/*
 * @Description:
 * @Author: FuHang
 * @Date: 2023-07-01 03:51:42
 * @LastEditTime: 2023-07-04 03:32:23
 * @LastEditors: Please set LastEditors
 * @FilePath: \nest-service\src\app.module.ts
 */
import { TypeOrmConfig } from './common/config/database.db';
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule } from '@nestjs/config';
import { UserModule } from './core/user/user.module';
import { RoleModule } from './core/role/role.module';
import { AuthModule } from './core/auth/auth.module';
import { UploadModule } from './core/upload/upload.module';
import { MenuModule } from './core/menu/menu.module';
// import config from './common/config/database.db';

@Module({
  imports: [
    // 配置全局的环境变量
    ConfigModule.forRoot({
      isGlobal: true,
      // load: [config],
    }),
    // 连接MySQL
    TypeOrmModule.forRoot(TypeOrmConfig),
    UserModule,
    RoleModule,
    AuthModule,
    UploadModule,
    MenuModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
