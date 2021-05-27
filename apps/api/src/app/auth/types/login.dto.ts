import { ApiProperty } from '@nestjs/swagger';

export default class LoginDto {
  @ApiProperty({ example: 'testuser' })
  username: string;
  @ApiProperty({ example: 'testpassword' })
  password: string;
}
