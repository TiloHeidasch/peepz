import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { UserService } from '../../user/user.service';
import { Request } from 'express';
import { environment } from 'apps/api/src/environments/environment';

@Injectable()
export class JwtRefreshStrategy extends PassportStrategy(
  Strategy,
  'jwt-refresh'
) {
  constructor(private readonly userService: UserService) {
    super({
      jwtFromRequest: ExtractJwt.fromExtractors([
        (request: Request) => {
          return request?.cookies?.Refresh;
        },
      ]),
      secretOrKey:
        process.env.refreshSecret ||
        environment.refreshSecret ||
        'refreshSecret',
      passReqToCallback: true,
    });
  }

  async validate(request: Request, payload: any) {
    const refreshToken = request.cookies?.Refresh;
    return this.userService.getUserIfRefreshTokenMatches(
      refreshToken,
      payload.userId
    );
  }
}
