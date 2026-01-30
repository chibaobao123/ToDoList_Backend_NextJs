import { Controller } from '@nestjs/common';
import { Post, Body } from '@nestjs/common';
import { AuthService } from '../auth/auth.service';
import { User } from '../schemas/users.schema';
import { UsersService } from './users.service';

@Controller('users')
export class UsersController {
  constructor(
    private authService: AuthService,
    private usersService: UsersService,
  ) {}
  @Post('login')
  login(@Body() loginDto: User) {
    return this.authService.validateUser(loginDto);
  }

  @Post('register')
  register(@Body() registerDto: User) {
    return this.usersService.register(registerDto);
  }
}
