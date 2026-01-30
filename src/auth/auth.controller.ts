import { Controller, Post, Body } from '@nestjs/common';
import { AuthService } from './auth.service';
import { User } from '../schemas/users.schema';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('login') // POST: http://localhost:3001/auth/login
  async login(@Body() body: User) {
    return this.authService.validateUser(body);
  }

  @Post('google') // POST: http://localhost:3001/auth/google
  async googleAuth(@Body('token') token: string) {
    return this.authService.validateGoogleUser(token);
  }
}
