/*
 * @Description:
 * @Author: FuHang
 * @Date: 2023-07-03 02:42:10
 * @LastEditTime: 2023-07-04 20:05:14
 * @LastEditors: Please set LastEditors
 * @FilePath: \nest-service\src\modules\user\user.module.ts
 */
import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Role } from '../role/entities/role.entity';
import { User } from './entities/user.entity';
import { RedisService } from '@/common/db/redis.service';
import { JwtService } from '@nestjs/jwt';

@Module({
  imports: [TypeOrmModule.forFeature([Role, User])],
  controllers: [UserController],
  providers: [UserService, RedisService, JwtService],
})
export class UserModule {}
