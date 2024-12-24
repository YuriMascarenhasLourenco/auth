import { Injectable, NestMiddleware } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';
import { API_KEY_HEADER } from '../constants';
@Injectable()
export class loginMiddleware implements NestMiddleware {
  use(req: Request, res: Response, Next: NextFunction) {
    if (req.headers[API_KEY_HEADER] === 'API_KEY') {
      Next();
    }
  }
}
