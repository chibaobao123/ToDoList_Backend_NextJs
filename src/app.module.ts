import { Module, NestModule, MiddlewareConsumer } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule, ConfigService } from '@nestjs/config';

import { MongooseModule } from '@nestjs/mongoose';

import { db } from '../database';
import { TodoModule } from './todo/todo.module';
import { UsersModule } from './users/users.module';
import { AuthService } from './auth/auth.service';
import { AuthController } from './auth/auth.controller';
import { AuthModule } from './auth/auth.module';

import { TodoMiddleware } from '././todo/todo.middleware';

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
  controllers: [AppController, AuthController],
  providers: [AppService, AuthService],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(TodoMiddleware)
      .exclude('/auth/login', '/uses/register', '/auth/google') // các route KHÔNG cần token
      .forRoutes('*'); // áp dụng cho toàn app
  }
}
