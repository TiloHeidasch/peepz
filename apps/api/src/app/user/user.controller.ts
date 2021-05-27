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
import { User } from '@peepz/api-interfaces';
import Log from '../Log';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import ChangeUsername from './types/change-username.dto';
import ChangePassword from './types/change-password.dto';

@Controller('user')
export class UserController {
  constructor(
    private readonly service: UserService,
    private readonly captchaService: CaptchaService
  ) {}

  @UseGuards(ThrottlerGuard)
  @Throttle(3, 60)
  @Post('register')
  async register(@Body() registrationData: RegisterDto): Promise<User> {
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
  @Put('username')
  async changeUsername(
    @Request() request,
    @Body() body: ChangeUsername
  ): Promise<User> {
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
  @Put('password')
  async changePassword(
    @Request() request,
    @Body() body: ChangePassword
  ): Promise<User> {
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
