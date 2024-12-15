import { BadRequestException, Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy, ExtractJwt } from 'passport-jwt';
import { JwtPayload } from './interfaces/jwt-payload.interface';
import { UserService } from 'src/user/user.service';
import { UserDto } from 'src/user/dto/user.dto';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(private userService: UserService) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: process.env.SECRET || 'NO SECRET',
    });
  }
  async validate(payload: JwtPayload): Promise<UserDto> {
    const user = await this.userService.findOne(payload.sub);
    if (!user) {
      throw new BadRequestException(' there is no user');
    }
    return user;
  }
}
