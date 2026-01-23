import { Controller, Post, Body } from '@nestjs/common';
import { AuthService } from './auth.service';
import { User } from '../users/users.schema';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('login') // POST: http://localhost:3001/auth/login
  async login(@Body() body: User) {
    return this.authService.validateUser(body);
  }
}
