/*
 * @Description:
 * @Author: FuHang
 * @Date: 2023-07-04 16:50:41
 * @LastEditTime: 2023-07-05 02:22:13
 * @LastEditors: Please set LastEditors
 * @FilePath: \nest-service\src\common\db\redis.service.ts
 */
import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import Redis from 'ioredis';

@Injectable()
export class RedisService {
  private readonly accessTokenRedis: Redis;
  private readonly refreshTokenRedis: Redis;
  private readonly configService: ConfigService;

  constructor() {
    this.accessTokenRedis = new Redis({
      host: process.env['REDIS_HOST'], // Redis host
      port: process.env['REDIS_PORT'] as any, // Redis port
      password: process.env['REDIS_PASSWORD'],
      db: process.env['REDIS_DB'] as any,
    });
  }

  async setWithExpiry(
    key: string,
    value: string,
    expirySeconds: number,
  ): Promise<void> {
    await this.accessTokenRedis.set(key, value, 'EX', expirySeconds);
  }

  async getWithExpiry(key: string): Promise<string | null> {
    const value = await this.accessTokenRedis.get(key);
    if (value) {
      const ttl = await this.accessTokenRedis.ttl(key);
      if (ttl > 0) {
        return value;
      }
    }
    return null;
  }

  async del(key: string): Promise<void> {
    await this.accessTokenRedis.del(key);
  }
}
