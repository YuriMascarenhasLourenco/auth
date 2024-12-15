import { AuthResponseInterface } from '../interfaces/auth-response.interface';

export class AuthResponseDto implements AuthResponseInterface {
  constructor(accessToken: string, refreshToken: string) {}
  accessToken: string;
  refreshToken: string;
}
