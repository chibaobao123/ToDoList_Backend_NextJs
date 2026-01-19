import { Injectable, OnModuleInit } from '@nestjs/common';
import { InjectConnection } from '@nestjs/mongoose';
import { Connection } from 'mongoose';

@Injectable()
export class AppService implements OnModuleInit {
  // Inject the Mongoose connection
  constructor(@InjectConnection() private readonly connection: Connection) {}

  onModuleInit() {
    // Sử dụng ép kiểu hoặc kiểm tra trạng thái từ Connection
    const isConnected = this.connection.readyState;
    // readyState: 1 = connected, 0 = disconnected, 2 = connecting, 3 = disconnecting, 99 = uninitialized

    if (isConnected) {
      console.log('✅ MongoDB đã kết nối thành công!');
    } else {
      console.log(
        '❌ MongoDB chưa kết nối. Trạng thái:',
        this.connection.readyState,
      );
    }
  }

  getHello(): string {
    return 'Hello World!';
  }
}
