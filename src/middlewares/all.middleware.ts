import { Injectable, NestMiddleware } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';

@Injectable()
export class AllMiddleware implements NestMiddleware {
  use(req: Request, res: Response, next: NextFunction) {
    console.log('alL middleware..');
    next();
  }
}
