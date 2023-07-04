/*
 * @Description:
 * @Author: FuHang
 * @Date: 2023-07-03 02:46:54
 * @LastEditTime: 2023-07-04 21:59:37
 * @LastEditors: Please set LastEditors
 * @FilePath: \nest-service\src\modules\auth\auth.controller.ts
 */
import {
  Controller,
  Post,
  Body,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('身份验证')
// @ApiExcludeController()
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('login')
  
  async login(
    @Body() body: { username: string; password: string },
  ): Promise<{ accessToken: string; refreshToken: string }> {
    const { username, password } = body;
    return this.authService.login(username, password);
  }

  @Post('refresh-token')
  async refreshToken(
    @Body() body: { refreshToken: string },
  ): Promise<{ accessToken: string }> {
    const { refreshToken } = body;
    return { accessToken: await this.authService.refreshToken(refreshToken) };
  }
}
