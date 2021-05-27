import { Controller, HttpCode, Post, Request, UseGuards } from '@nestjs/common';

import { AuthService } from './auth.service';
import { LocalAuthGuard } from './guards/local-auth.guard';
import JwtRefreshGuard from './guards/jwt-refresh.guard';
import { JwtAuthGuard } from './guards/jwt-auth.guard';
import { UserService } from '../user/user.service';
import { User } from '@peepz/api-interfaces';
import Log from '../Log';

@Controller('auth')
export class AuthController {
  constructor(
    private readonly service: AuthService,
    private readonly userService: UserService
  ) {}

  @HttpCode(200)
  @UseGuards(LocalAuthGuard)
  @Post('log-in')
  async logIn(@Request() request): Promise<User> {
    const start = new Date().getTime();
    const { user } = request;
    const accessTokenCookie = this.service.getCookieWithJwtAccessToken(user.id);
    const refreshTokenCookie = this.service.getCookieWithJwtRefreshToken(
      user.id
    );

    await this.userService.setCurrentRefreshToken(
      refreshTokenCookie.token,
      user.id
    );

    request.res.setHeader('Set-Cookie', [
      accessTokenCookie.cookie,
      refreshTokenCookie.cookie,
    ]);
    user.password = undefined;
    user.refreshToken = undefined;
    user.__v = undefined;
    const result = {
      username: user.username,
      jwtToken: accessTokenCookie.token,
      jwtRefreshToken: refreshTokenCookie.token,
    };
    const end = new Date().getTime();
    Log.log(AuthController.name, this.logIn, start, end, { result });
    return result;
  }

  @HttpCode(200)
  @UseGuards(JwtAuthGuard)
  @Post('log-out')
  async logOut(@Request() request) {
    const start = new Date().getTime();
    const { user } = request;
    await this.userService.removeRefreshToken(user.id);
    request.res.setHeader('Set-Cookie', this.service.getCookiesForLogOut());
    const end = new Date().getTime();
    Log.log(AuthController.name, this.logOut, start, end, { user });
  }

  @UseGuards(JwtRefreshGuard)
  @Post('refresh')
  async refresh(@Request() request): Promise<User> {
    const start = new Date().getTime();
    const { user } = request;
    const accessTokenCookie = this.service.getCookieWithJwtAccessToken(
      request.user.id
    );
    const refreshTokenCookie = this.service.getCookieWithJwtRefreshToken(
      user.id
    );

    await this.userService.setCurrentRefreshToken(
      refreshTokenCookie.token,
      user.id
    );

    request.user.password = undefined;
    request.user.refreshToken = undefined;
    request.user.__v = undefined;
    request.res.setHeader('Set-Cookie', accessTokenCookie.cookie);
    const result = {
      username: user.username,
      jwtToken: accessTokenCookie.token,
      jwtRefreshToken: refreshTokenCookie.token,
    };
    const end = new Date().getTime();
    Log.log(AuthController.name, this.refresh, start, end, { result });
    return result;
  }
}
