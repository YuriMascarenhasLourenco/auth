import { JwtModuleOptions } from '@nestjs/jwt';

export interface jwtConfigInterface {
  secret: string;
  access: JwtModuleOptions;
  refresh: JwtModuleOptions;
}
