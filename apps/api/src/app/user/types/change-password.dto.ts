import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString, MinLength } from 'class-validator';

export class ChangePasswordDto {
  @ApiProperty({ minLength: 8, example: 'password' })
  @IsString()
  @IsNotEmpty()
  @MinLength(8)
  password: string;
}

export default ChangePasswordDto;
