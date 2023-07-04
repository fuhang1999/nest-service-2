/*
 * @Description:
 * @Author: FuHang
 * @Date: 2023-03-31 01:11:57
 * @LastEditTime: 2023-07-05 01:48:38
 * @LastEditors: Please set LastEditors
 * @FilePath: \nest-service\src\modules\auth\jwt.strategy.ts
 */
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
// import { jwtConstants } from './constants';
import { AuthService } from './auth.service';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(private readonly authService: AuthService) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: 'secretKey',
    });
  }

  async validate(payload: any) {
    console.log('user-payload', payload);
    // const user = await this.authService.validateUser(payload.username, payload.password);
    // console.log('user', user);

    // if (!user) {
    //   throw new UnauthorizedException();
    // }
    // return user;
    const user = await this.authService.validateUser(payload.username);
    // 如果有用户信息，代表 token 没有过期，没有则 token 已失效
    if (!user) throw new UnauthorizedException();
    return user;
  }
}
