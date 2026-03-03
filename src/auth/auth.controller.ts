import { JwtPayload } from './../interfaces/jwt-payload.interface';
import { User } from './../schemas/users.schema';
import { Controller, Post, Get, Body, Req, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { JwtAuthGuard } from './jwt-auth.guard';
import { Request } from 'express';
import { Public } from '../public.decorator';

// Định nghĩa Interface để Request hiểu được thuộc tính user
interface RequestWithPayload extends Request {
  jwtPayload: JwtPayload;
}

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @UseGuards(JwtAuthGuard)
  @Get('me')
  getMe(@Req() req: RequestWithPayload) {
    return this.authService.getMe(req.jwtPayload);
  }

  @Public()
  @Post('login') // POST: http://localhost:3001/auth/login
  async login(@Body() body: User) {
    return this.authService.validateUser(body);
  }

  @Public()
  @Post('google') // POST: http://localhost:3001/auth/google
  async googleAuth(@Body('token') token: string) {
    console.log('Received Google token:', token);
    return this.authService.validateGoogleUser(token);
  }
}
