import { IsNotEmpty, IsString, MaxLength, MinLength } from 'class-validator';

export class ChangeUsername {
  @IsString()
  @IsNotEmpty()
  @MinLength(4)
  @MaxLength(54)
  username: string;
}

export default ChangeUsername;
