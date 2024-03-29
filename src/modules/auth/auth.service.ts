/*
 * @Description:
 * @Author: FuHang
 * @Date: 2023-07-04 11:46:03
 * @LastEditTime: 2023-07-05 02:45:07
 * @LastEditors: Please set LastEditors
 * @FilePath: \nest-service\src\modules\auth\auth.service.ts
 */
import {
  BadRequestException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { RedisService } from '@/common/db/redis.service';
import { UserService } from '../user/user.service';
// import { v4 as uuidv4 } from 'uuid';
import { customAlphabet } from 'nanoid';
const nanoid = customAlphabet('1234567890abcdefghjiklmnopqrstuvwxyz', 18);
@Injectable()
export class AuthService {
  constructor(
    private readonly jwtService: JwtService,
    private readonly redisService: RedisService,
    private readonly userService: UserService,
  ) {}

  async validateUser(username: string): Promise<any> {
    return await this.userService.findByUsername(username);
  }

  async login(
    username: string,
    pass: string,
  ): Promise<{ accessToken: string; refreshToken: string }> {
    const user = await this.userService.findByUsername(username);
    if (!user) {
      throw new BadRequestException(`用户${username}未注册~`);
    }

    if (user?.password !== pass) {
      throw new BadRequestException(`密码错误，请稍后再试`);
    }

    // const uu = `${user.id}:${user}`
    // const a = await this.redisService.getWithExpiry(uu)

    const accessToken = nanoid();
    const refreshToken = nanoid();
    // // 生成一个随机的accessToken和refreshToken
    // const accessToken = this.generateAccessToken(username);
    // const refreshToken = this.generateRefreshToken(username);

    // 将accessToken存储到Redis中，并设置过期时间
    await this.redisService.setWithExpiry(
      accessToken,
      this.generateAccessToken(user),
      // accessTokenExpirySeconds,
      60 * 60 * 4,
    );

    // 将refreshToken存储到Redis中，并设置过期时间
    await this.redisService.setWithExpiry(
      refreshToken,
      this.generateRefreshToken(user),
      60 * 60 * 4,
    );

    return { accessToken, refreshToken };
  }

  async refreshToken(refreshToken: string): Promise<string> {
    // 从Redis中获取存储的用户名
    const username = await this.redisService.getWithExpiry(refreshToken);

    if (username) {
      // 生成一个新的accessToken
      const token = nanoid();
      const accessToken = this.generateAccessToken(username);
      // 更新accessToken的过期时间
      await this.redisService.setWithExpiry(username, accessToken, 60 * 60 * 4);

      return token;
    }

    throw new UnauthorizedException('Invalid refresh token');
  }

  async generateToken(userId: string): Promise<string> {
    const token = nanoid();
    await this.redisService.setWithExpiry(token, userId, 3600); // 设置token到Redis并设置过期时间为1小时
    return token;
  }

  private generateAccessToken(user: any): string {
    const payload = JSON.stringify(user);
    return this.jwtService.sign(payload);
  }

  private generateRefreshToken(user: any): string {
    // 生成一个随机的refreshToken
    // return this.generateAccessToken(username);
    const payload = JSON.stringify(user);
    return this.jwtService.sign(payload);
  }
}
