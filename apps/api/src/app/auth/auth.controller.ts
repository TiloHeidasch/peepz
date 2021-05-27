import { Controller, HttpCode, Post, Request, UseGuards } from '@nestjs/common';

import { AuthService } from './auth.service';
import { LocalAuthGuard } from './guards/local-auth.guard';
import JwtRefreshGuard from './guards/jwt-refresh.guard';
import { JwtAuthGuard } from './guards/jwt-auth.guard';
import { UserService } from '../user/user.service';
import Log from '../Log';
import LoginDto from './types/login.dto';
import {
  ApiTags,
  ApiBody,
  ApiCookieAuth,
  ApiOkResponse,
  ApiUnauthorizedResponse,
  ApiOperation,
} from '@nestjs/swagger';
import { UserDto } from '../user/types/user.dto';

@ApiTags('Authentication')
@Controller('auth')
export class AuthController {
  constructor(
    private readonly service: AuthService,
    private readonly userService: UserService
  ) {}

  @HttpCode(200)
  @UseGuards(LocalAuthGuard)
  @ApiOperation({
    summary: 'Login',
    description:
      'Login to the API using username and password, to recieve a JWT- and a Refreshtoken for use with the other endpoints.',
  })
  @ApiBody({ type: LoginDto })
  @ApiOkResponse({
    description: 'Details of the logged in User',
    type: UserDto,
  })
  @ApiUnauthorizedResponse({ description: 'Wrong credentials' })
  @Post('login')
  async logIn(@Request() request): Promise<UserDto> {
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
  @ApiOperation({
    summary: 'Logout',
    description:
      'Logout from the API. This will clear your local JWT- and a Refreshtoken.',
  })
  @ApiCookieAuth()
  @ApiOkResponse({ description: 'Successfully logged out' })
  @ApiUnauthorizedResponse({ description: 'Unauthorized' })
  @Post('logout')
  async logOut(@Request() request) {
    const start = new Date().getTime();
    const { user } = request;
    await this.userService.removeRefreshToken(user.id);
    request.res.setHeader('Set-Cookie', this.service.getCookiesForLogOut());
    const end = new Date().getTime();
    Log.log(AuthController.name, this.logOut, start, end, { user });
  }

  @HttpCode(200)
  @UseGuards(JwtRefreshGuard)
  @ApiOperation({
    summary: 'Refresh JWT Token',
    description:
      'Recieve a new JWT Token for use with the other endpoints. Requires a valid Refresh Token.',
  })
  @ApiCookieAuth()
  @ApiOkResponse({
    description: 'Details of the refreshed in User',
    type: UserDto,
  })
  @ApiUnauthorizedResponse({ description: 'Unauthorized' })
  @Post('refresh')
  async refresh(@Request() request): Promise<UserDto> {
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
