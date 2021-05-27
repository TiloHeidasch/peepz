import { Strategy } from 'passport-local';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { AuthService } from '../auth.service';

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
  constructor(private authenticationService: AuthService) {
    super({
      usernameField: 'username',
    });
  }
  async validate(username: string, password: string): Promise<any> {
    const user = this.authenticationService.getAuthenticatedUser(
      username,
      password
    );
    if (!user) {
      throw new UnauthorizedException();
    }
    return user;
  }
}
