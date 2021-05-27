import { IsNotEmpty, IsString, MinLength } from 'class-validator';

export class ChangePassword {
  @IsString()
  @IsNotEmpty()
  @MinLength(8)
  password: string;
}

export default ChangePassword;
