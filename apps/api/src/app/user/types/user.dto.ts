import { ApiProperty } from '@nestjs/swagger';
import { User } from '@peepz/api-interfaces';

export class UserDto implements User {
  @ApiProperty()
  username: string;
  @ApiProperty({ required: false })
  password?: string;
  @ApiProperty({ required: false })
  jwtToken?: string;
  @ApiProperty({ required: false })
  jwtRefreshToken?: string;
}
