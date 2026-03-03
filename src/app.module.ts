import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { APP_GUARD } from '@nestjs/core'; // Thêm APP_GUARD để thiết lập Guard toàn cục

import { MongooseModule } from '@nestjs/mongoose';

import { db } from '../database';
import { TodoModule } from './todo/todo.module';
import { UsersModule } from './users/users.module';
import { AuthModule } from './auth/auth.module';

import { JwtAuthGuard } from './auth/jwt-auth.guard'; // Import Guard của bạn

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true, // Cho phép sử dụng process.env ở mọi nơi mà không cần import lại
    }),
    // 2. Kết nối MongoDB sử dụng ConfigService để lấy biến môi trường
    MongooseModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: () => ({
        uri: db,
      }),
      inject: [ConfigService],
    }),
    TodoModule,
    UsersModule,
    AuthModule,
  ],
  controllers: [AppController],
  providers: [
    AppService, // Đăng ký JwtAuthGuard làm Guard toàn cục
    // Điều này giúp kiểm tra token cho bất kỳ link nào người dùng truy cập
    {
      provide: APP_GUARD,
      useClass: JwtAuthGuard,
    },
  ],
})
export class AppModule {}
