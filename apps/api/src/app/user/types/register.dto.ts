import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString, MaxLength, MinLength } from 'class-validator';
import { Register } from 'libs/api-interfaces/src';

export class RegisterDto implements Register {
  @ApiProperty({ minLength: 4, maxLength: 64, example: 'user' })
  @IsString()
  @IsNotEmpty()
  @MinLength(4)
  @MaxLength(64)
  username: string;
  @ApiProperty({ minLength: 8, example: 'password' })
  @IsString()
  @IsNotEmpty()
  @MinLength(8)
  password: string;
  @ApiProperty({ example: 'Just use the test user or create one' })
  @IsString()
  @IsNotEmpty()
  captcha: string;
}

export default RegisterDto;
