import {
  Body,
  Controller,
  Get,
  Post,
  Request,
  UseGuards,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { UserDto } from 'src/user/dto/user.dto';
import { AuthService } from './auth.service';
import { AuthGuardJWT } from './jwt-auth.guard';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}
  @UseGuards(AuthGuard('local'))
  @Post('signin')
  signIn(user: UserDto) {
    return user;
  }
  @Post('login')
  login(@Body() signInDto: Record<string, string>) {
    return this.authService.signIn(signInDto.name, signInDto.password);
  }
  @UseGuards(AuthGuardJWT)
  @Get('profile')
  getProfile(@Request() req) {
    return req.user;
  }
}
