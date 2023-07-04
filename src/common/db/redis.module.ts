/*
 * @Description: 
 * @Author: FuHang
 * @Date: 2023-07-04 16:50:31
 * @LastEditTime: 2023-07-04 16:51:17
 * @LastEditors: 
 * @FilePath: \nest-service\src\common\db\redis.module.ts
 */
import { Module } from '@nestjs/common';
import { RedisService } from './redis.service';

@Module({
  providers: [RedisService],
  exports: [RedisService],
})
export class RedisModule {}
