import { Inject, Injectable, UnauthorizedException } from '@nestjs/common';
import jwt from 'jsonwebtoken';
import { ConfigType } from '@nestjs/config';
import jwtConfig from '../config/jwtConfig';

@Injectable()
export class AuthService {
  constructor(
    @Inject(jwtConfig.KEY) private config: ConfigType<typeof jwtConfig>,
  ) {}

  verify(jwtString: string) {
    console.log(process.env.EMAIL_SERVICE);
    try {
      const payload = jwt.verify(jwtString, this.config.jwtSecret) as
        | jwt.JwtPayload
        | string;

      console.log('Asdfasdf');
      // const { id, email } = payload;

      return {
        userId: 1,
      };
    } catch (e) {
      throw new UnauthorizedException();
    }
  }
}
