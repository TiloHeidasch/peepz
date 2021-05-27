import { HttpService, Inject, Injectable } from '@nestjs/common';
import { REQUEST } from '@nestjs/core';
import { Request } from 'express';
import { map } from 'rxjs/operators';
import { environment } from '../../environments/environment';

@Injectable()
export class CaptchaService {
  constructor(
    @Inject(REQUEST) private readonly request: Request,
    private httpService: HttpService
  ) {}

  public validate(value: string): Promise<any> {
    const remoteAddress = this.request.socket.remoteAddress;
    const secretKey =
      process.env.captchaSecret || environment.captchaSecret || 'captchaSecret';
    const url =
      'https://www.google.com/recaptcha/api/siteverify?secret=' +
      secretKey +
      '&response=' +
      value +
      '&remoteip=' +
      remoteAddress;

    return this.httpService
      .post(url)
      .pipe(
        map((response) => {
          return response['data'];
        })
      )
      .toPromise();
  }
}
