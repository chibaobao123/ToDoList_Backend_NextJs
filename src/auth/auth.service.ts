import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UsersService } from '../users/users.service';
import { JwtPayload } from '../interfaces/jwt-payload.interface';
import { User } from '../schemas/users.schema';
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
        role: user.role,
      };
      return {
        access_token: this.jwtService.sign(payload), // Tạo token
      };
    }

    throw new UnauthorizedException('Thông tin đăng nhập không chính xác');
  }

  async getGoogleUserInfo(
    token: string,
  ): Promise<{ email: string; name: string }> {
    // Gọi Google API để lấy thông tin user
    const response = await fetch(
      `https://www.googleapis.com/oauth2/v3/userinfo?access_token=${token}`,
    );
    if (!response.ok) {
      throw new UnauthorizedException('Không thể lấy thông tin từ Google');
    }
    const data = (await response.json()) as User;
    return {
      email: data.email,
      name: data.name,
    };
  }

  async validateGoogleUser(token: string) {
    // 1. Gọi Google API để lấy thông tin user từ token
    const googleUser = await this.getGoogleUserInfo(token);
    if (!googleUser || !googleUser.email) {
      throw new UnauthorizedException('Google token không hợp lệ');
    }
    // 2. Kiểm tra nếu user đã tồn tại trong DB
    let user = await this.usersService.findByEmail(googleUser.email);
    // 3. Nếu chưa tồn tại, tạo mới user
    if (!user) {
      user = await this.usersService.createGoogleUser(googleUser);
    }
    // 4. Tạo JWT token cho user
    const payload: JwtPayload = {
      email: user.email,
      sub: user._id.toString(),
      role: user.role,
    };
    return {
      access_token: this.jwtService.sign(payload),
      email: user.email,
      name: user.name,
    };
  }
}
