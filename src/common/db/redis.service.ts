/*
 * @Description:
 * @Author: FuHang
 * @Date: 2023-07-04 16:50:41
 * @LastEditTime: 2023-07-04 17:49:44
 * @LastEditors: Please set LastEditors
 * @FilePath: \nest-service\src\common\db\redis.service.ts
 */
import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import Redis from 'ioredis';

@Injectable()
export class RedisService {
  private readonly redisClient: Redis;
  private readonly configService: ConfigService;

  constructor() {
    this.redisClient = new Redis({
      host: 'localhost', // Redis host
      port: 6379, // Redis port
      password: '123456',
      db: 0,
      //   host: this.configService.get<string>('redis.host'), // Redis host
      //   port: this.configService.get<number>('redis.port'), // Redis port
      //   password: this.configService.get<any>('redis.password'),
      //   db: this.configService.get<number>('redis.db'),
    });
  }

  async setWithExpiry(
    key: string,
    value: string,
    expirySeconds: number,
  ): Promise<void> {
    await this.redisClient.set(key, value, 'EX', expirySeconds);
  }

  async getWithExpiry(key: string): Promise<string | null> {
    const value = await this.redisClient.get(key);
    if (value) {
      const ttl = await this.redisClient.ttl(key);
      if (ttl > 0) {
        return value;
      }
    }
    return null;
  }

  async del(key: string): Promise<void> {
    await this.redisClient.del(key);
  }
}
