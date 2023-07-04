/*
 * @Description:
 * @Author: FuHang
 * @Date: 2023-07-04 11:46:03
 * @LastEditTime: 2023-07-04 21:00:04
 * @LastEditors: Please set LastEditors
 * @FilePath: \nest-service\src\modules\auth\auth.module.ts
 */
import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { JwtModule } from '@nestjs/jwt';
// import { jwtConstants } from './constants';
import { RedisService } from '@/common/db/redis.service';
import { UserService } from '../user/user.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from '../user/entities/user.entity';
import { JwtStrategy } from './jwt.strategy';

@Module({
  imports: [
    TypeOrmModule.forFeature([User]),
    JwtModule.register({
      secret: 'secretKey',
    }),
  ],
  controllers: [AuthController],
  providers: [AuthService, JwtStrategy, RedisService, UserService],
})
export class AuthModule {}
