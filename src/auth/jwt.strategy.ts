import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { JwtPayload } from '../interfaces/jwt-payload.interface';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(private configService: ConfigService) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false, // Phải kiểm tra hết hạn
      secretOrKey: configService.get<string>('KEY_SECRET')!, // Phải trùng với secret trong AuthModule
    });
  }

  validate(payload: JwtPayload) {
    /**
     * payload chính là object bạn sign khi login
     * return gì → req.user = cái đó
     */
    return { email: payload.email, sub: payload.sub, role: payload.role };
  }
}
