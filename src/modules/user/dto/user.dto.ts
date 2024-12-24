import { IsEmail, IsString } from 'class-validator';
import { UserInterface } from '../interfaces/user.interface';

export class UserDto implements UserInterface {
  @IsEmail()
  email: string;

  @IsString()
  id: string;

  @IsString()
  name: string;

  @IsString()
  password: string;

  @IsString()
  salt: string;
}
