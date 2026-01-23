import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UsersService } from '../users/users.service';
import { JwtPayload } from './interfaces/jwt-payload.interface';
import { User } from '../users/users.schema';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
  ) {}

  async validateUser(userDto: User) {
    // 1. Tìm user theo email
    const user = await this.usersService.findByEmail(userDto.email);

    // 2. Kiểm tra password dùng bcrypt.compare
    if (user && (await bcrypt.compare(userDto.password, user.password))) {
      const payload: JwtPayload = {
        email: user.email,
        sub: user._id.toString(),
      };
      return {
        access_token: this.jwtService.sign(payload), // Tạo token
      };
    }

    throw new UnauthorizedException('Thông tin đăng nhập không chính xác');
  }
}
