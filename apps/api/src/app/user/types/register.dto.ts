import { IsNotEmpty, IsString, MaxLength, MinLength } from 'class-validator';
import { Register } from 'libs/api-interfaces/src';

export class RegisterDto implements Register {
  @IsString()
  @IsNotEmpty()
  @MinLength(4)
  @MaxLength(64)
  username: string;
  @IsString()
  @IsNotEmpty()
  @MinLength(8)
  password: string;
  @IsString()
  @IsNotEmpty()
  captcha: string;
}

export default RegisterDto;
