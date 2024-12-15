import { IsEmail, IsString } from 'class-validator';
import { createUser } from '../interfaces/create-user.interface';

import { UserDto } from './user.dto';

export class CreateUserDto implements createUser {
  @IsString()
  name: string;

  @IsString()
  password: string;

  @IsEmail()
  email: string;
}
