import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy } from 'passport-local';
import { UserService } from 'src/user/user.service';

@Injectable()
export class localStrategy extends PassportStrategy(Strategy) {
  constructor(private userService: UserService) {
    super({
      usernameField: 'name',
      passwordField: 'password',
    });
  }
  async validate(name: string, password: string) {
    const user = this.userService.validatePassword(name, password);
    if (!user) {
      throw new UnauthorizedException('Invalid username or password');
    }
    return user;
  }
}
