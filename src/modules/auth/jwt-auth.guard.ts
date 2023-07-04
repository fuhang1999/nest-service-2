/*
 * @Description:
 * @Author: FuHang
 * @Date: 2023-03-31 01:11:57
 * @LastEditTime: 2023-07-05 02:43:28
 * @LastEditors: Please set LastEditors
 * @FilePath: \nest-service\src\modules\auth\jwt-auth.guard.ts
 */
import { RedisService } from '@/common/db/redis.service';
import {
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { JwtService } from '@nestjs/jwt';
import { AuthGuard } from '@nestjs/passport';

@Injectable()
export class JwtAuthGuard extends AuthGuard('jwt') {
  constructor(
    private reflector: Reflector,
    private readonly redisService: RedisService,
    private readonly jwtService: JwtService,
  ) {
    super();
  }

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const isPublic = this.reflector.getAllAndOverride<boolean>('guest', [
      context.getHandler(),
      context.getClass(),
    ]);
    if (isPublic) {
      return true;
    }
    // token对比
    const request = context.switchToHttp().getRequest();
    const authorization = request['headers'].authorization || void 0;
    let tokenNotTimeOut = true;
    if (authorization) {
      const token = authorization.split(' ')[1]; // authorization: Bearer xxx
      console.log('token', token)
      try {
        const redis_token = await this.redisService.getWithExpiry(token);
        console.log('redis_token', redis_token);
        request['headers'].authorization = `Bearer ${redis_token}`;
        console.log("request['headers']", request['headers']);
        const payload = this.jwtService.decode(redis_token);
        // request.user = payload; // 将userId存储到request中，供后续使用
        console.log('payload', payload);
        if (!payload) {
          throw new UnauthorizedException('您的登录信息已过期，请重新登录');
        }
      } catch (err) {
        tokenNotTimeOut = false;
        throw new UnauthorizedException(err.message || '请重新登录');
      }
    }
    return tokenNotTimeOut && (super.canActivate(context) as boolean);
  }

  getRequest(context: ExecutionContext) {
    const ctx = context.switchToHttp();
    const request = ctx.getRequest();
    return request;
  }

  handleRequest<User>(err: any, user: User): User {
    if (err || !user) {
      throw new UnauthorizedException('身份验证失败');
    }
    return user;
  }
}
