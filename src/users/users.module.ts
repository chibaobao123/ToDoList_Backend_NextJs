import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { User, UserSchema } from './users.schema';
import { AuthModule } from '../auth/auth.module';
import { forwardRef } from '@nestjs/common';

@Module({
  imports: [
    forwardRef(() => AuthModule), // Thêm dòng này để UsersController dùng được AuthService,
    // Phải khai báo Model ở đây để UsersService có thể sử dụng
    MongooseModule.forFeature([{ name: User.name, schema: UserSchema }]),
  ],
  providers: [UsersService],
  controllers: [UsersController],
  exports: [UsersService], // QUAN TRỌNG: Phải có dòng này để Module khác dùng được
})
export class UsersModule {}
