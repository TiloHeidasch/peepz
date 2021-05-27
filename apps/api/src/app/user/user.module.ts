import { HttpModule, Module } from '@nestjs/common';
import { UserService } from './user.service';
import { MongooseModule } from '@nestjs/mongoose';
import { User, UserSchema } from './types/user.schema';
import { UserController } from './user.controller';
import { CaptchaService } from './captcha.service';
import { ThrottlerModule } from '@nestjs/throttler';

@Module({
  imports: [
    MongooseModule.forRoot(
      'mongodb://' + (process.env.mongo || '10.0.0.12') + '/peepz'
    ),
    MongooseModule.forFeature([{ name: User.name, schema: UserSchema }]),
    ThrottlerModule.forRoot(),
    HttpModule,
  ],
  providers: [UserService, CaptchaService],
  controllers: [UserController],
  exports: [UserService],
})
export class UserModule {}
