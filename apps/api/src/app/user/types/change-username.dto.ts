import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString, MaxLength, MinLength } from 'class-validator';

export class ChangeUsernameDto {
  @ApiProperty({ minLength: 4, maxLength: 64, example: 'user' })
  @IsString()
  @IsNotEmpty()
  @MinLength(4)
  @MaxLength(64)
  username: string;
}

export default ChangeUsernameDto;
