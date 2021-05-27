import {
  Body,
  Controller,
  Request,
  Post,
  Put,
  UseGuards,
} from '@nestjs/common';

import { ThrottlerGuard, Throttle } from '@nestjs/throttler';
import RegisterDto from './types/register.dto';
import { UserService } from '../user/user.service';
import { CaptchaService } from './captcha.service';
import { BadRequestException } from '@nestjs/common';
import Log from '../Log';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import ChangeUsernameDto from './types/change-username.dto';
import ChangePasswordDto from './types/change-password.dto';
import {
  ApiBadRequestResponse,
  ApiBody,
  ApiCookieAuth,
  ApiOkResponse,
  ApiOperation,
  ApiTags,
} from '@nestjs/swagger';
import { environment } from '../../environments/environment';
import { UserDto } from './types/user.dto';

@ApiTags('User')
@Controller('user')
export class UserController {
  constructor(
    private readonly service: UserService,
    private readonly captchaService: CaptchaService
  ) {}

  @UseGuards(ThrottlerGuard)
  @ApiOperation({
    summary: 'Register',
    description: `Register a new user of the API. Requires a valid ReCaptcha for following web-key: ${
      environment.production
        ? '6LeVzNEaAAAAALzTL14ZKpNJB9o4V799nAuDqtCl'
        : '6Ld9-NIaAAAAAKyJtGklUT0NwGU8U7P9DhJ1XAT0'
    }.`,
  })
  @ApiCookieAuth()
  @ApiOkResponse({
    description: 'The created User.',
    type: [UserDto],
  })
  @ApiBadRequestResponse({
    description: 'Invalid Captcha or Duplicate Username',
  })
  @Throttle(3, 60)
  @Post('register')
  async register(@Body() registrationData: RegisterDto): Promise<UserDto> {
    const start = new Date().getTime();
    const captcha = registrationData.captcha;
    const captchaResult = await this.captchaService.validate(captcha);
    if (!captchaResult.success) {
      throw new BadRequestException('Invalid Captcha');
    }
    const result = this.service.register(registrationData);
    const end = new Date().getTime();
    Log.log(UserController.name, this.register, start, end, { result });
    return result;
  }
  @UseGuards(JwtAuthGuard)
  @ApiOperation({
    summary: 'Change Username',
    description:
      'Change the user name of the logged in user. Requires a valid JWT Token.',
  })
  @ApiCookieAuth()
  @ApiOkResponse({
    description: 'The changed User.',
    type: [UserDto],
  })
  @ApiBadRequestResponse({
    description: 'Duplicate Username',
  })
  @Put('username')
  async changeUsername(
    @Request() request,
    @Body() body: ChangeUsernameDto
  ): Promise<UserDto> {
    const start = new Date().getTime();
    const { user } = request;
    const { username } = body;
    const result = await this.service.updateUsername(user, username);
    result.password = undefined;
    result.refreshToken = undefined;
    result.__v = undefined;
    const end = new Date().getTime();
    Log.log(UserController.name, this.changeUsername, start, end, { result });
    return result;
  }
  @UseGuards(JwtAuthGuard)
  @ApiOperation({
    summary: 'Change Password',
    description:
      'Change the password of the logged in user. Requires a valid JWT Token.',
  })
  @ApiCookieAuth()
  @ApiOkResponse({
    description: 'The changed User.',
    type: [UserDto],
  })
  @Put('password')
  async changePassword(
    @Request() request,
    @Body() body: ChangePasswordDto
  ): Promise<UserDto> {
    const start = new Date().getTime();
    const { user } = request;
    const { password } = body;
    const result = await this.service.updatePassword(user, password);
    result.password = undefined;
    result.refreshToken = undefined;
    result.__v = undefined;
    const end = new Date().getTime();
    Log.log(UserController.name, this.changePassword, start, end, { result });
    return result;
  }
}
