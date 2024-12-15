import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { UserModule } from 'src/user/user.module';
import { localStrategy } from './auth-local.strategy';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { JwtStrategy } from './auth-jwt.strategy';
import { jwtConstants } from './constants';
import { AuthGuardJWT } from './jwt-auth.guard';
import { APP_GUARD } from '@nestjs/core';
@Module({
  imports: [
    PassportModule.register({
      defaultStrategy: 'jwt',
      property: 'user',
      session: false,
    }),
    JwtModule.register({
      global: true,
      secret: jwtConstants.secret,
      signOptions: { expiresIn: '60s' },
    }),
    UserModule,
  ],
  controllers: [AuthController],
  providers: [
    AuthService,
    localStrategy,
    JwtStrategy,
    {
      provide: APP_GUARD,
      useClass: AuthGuardJWT,
    },
  ],
  exports: [AuthService],
})
export class AuthModule {}
