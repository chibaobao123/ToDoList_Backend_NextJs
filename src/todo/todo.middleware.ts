import {
  Injectable,
  NestMiddleware,
  UnauthorizedException,
} from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';
import * as jwt from 'jsonwebtoken';

export interface RequestWithUser extends Request {
  user?: any;
}

@Injectable()
export class TodoMiddleware implements NestMiddleware {
  use(req: RequestWithUser, res: Response, next: NextFunction) {
    const authHeader = req.headers.authorization;

    if (!authHeader) {
      throw new UnauthorizedException('Missing Authorization header');
    }

    const token = authHeader.split(' ')[1]; // Bearer xxx

    if (!token) {
      throw new UnauthorizedException('Invalid token format');
    }

    try {
      const secret = process.env.KEY_SECRET;

      if (!secret) {
        throw new Error('KEY_SECRET is not defined');
      }

      const decoded = jwt.verify(token, secret);

      // gắn user vào request
      req.user = decoded;

      next();
    } catch (err) {
      throw new UnauthorizedException('Token invalid or expired ', err);
    }
  }
}
