import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { environment } from '../../environments/environment';
import { UserService } from '../user/user.service';
const bcrypt = require('bcrypt');

@Injectable()
export class AuthService {
  constructor(
    private jwtService: JwtService,
    private readonly userService: UserService
  ) {}

  public async getAuthenticatedUser(
    username: string,
    plainTextPassword: string
  ) {
    try {
      const user = await this.userService.getByUsername(username);
      await this.verifyPassword(plainTextPassword, user.password);
      user.password = undefined;
      return user;
    } catch (error) {
      throw new HttpException(
        'Wrong credentials provided',
        HttpStatus.BAD_REQUEST
      );
    }
  }
  public getCookieForLogOut() {
    return `Authentication=; HttpOnly; Path=/; Max-Age=0`;
  }

  private async verifyPassword(
    plainTextPassword: string,
    hashedPassword: string
  ) {
    const isPasswordMatching = await bcrypt.compare(
      plainTextPassword,
      hashedPassword
    );
    if (!isPasswordMatching) {
      throw new HttpException(
        'Wrong credentials provided',
        HttpStatus.BAD_REQUEST
      );
    }
  }
  getCookieWithJwtAccessToken(userId: number) {
    const payload = { userId };
    const token = this.jwtService.sign(payload, {
      secret: environment.jwtSecret,
      expiresIn: environment.jwtExpiry,
    });
    return {
      token,
      cookie: `Authentication=${token}; HttpOnly; Path=/; Max-Age=${environment.jwtExpiry}`,
    };
  }

  getCookieWithJwtRefreshToken(userId: number) {
    const payload = { userId };
    const token = this.jwtService.sign(payload, {
      secret: environment.refreshSecret,
      expiresIn: environment.refreshExpiry,
    });
    return {
      token,
      cookie: `Refresh=${token}; HttpOnly; Path=/; Max-Age=${environment.refreshExpiry}`,
    };
  }

  public getCookiesForLogOut() {
    return [
      'Authentication=; HttpOnly; Path=/; Max-Age=0',
      'Refresh=; HttpOnly; Path=/; Max-Age=0',
    ];
  }
}
