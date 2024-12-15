import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

import { UserService } from 'src/user/user.service';
@Injectable()
export class AuthService {
  constructor(
    private jwtService: JwtService,

    private userService: UserService,
  ) {}

  async validatesUserPassword(
    name: string,
    password: string,
  ): Promise<boolean> {
    const user = await this.userService.validatePassword(name, password);
    if (!user) {
      return false;
    }
    return true;
  }
  async signIn(
    username: string,
    pass: string,
  ): Promise<{ access_token: string }> {
    const user = await this.userService.validatePassword(username, pass);
    if (user?.password !== pass) {
      throw new UnauthorizedException();
    }
    const payload = { sub: user.id, username: user.name };
    return {
      access_token: await this.jwtService.signAsync(payload),
    };
  }
}
