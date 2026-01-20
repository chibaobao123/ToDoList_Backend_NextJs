import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // Khi Next.js (chạy ở cổng 3000) gọi API đến NestJS (chạy ở cổng 3001), 
  // trình duyệt sẽ chặn yêu cầu này vì lý do bảo mật (lỗi CORS).
  // Cách sửa: Mở CORS trong NestJS Bạn cần quay lại file src/main.ts 
  // của project Backend và thêm dòng app.enableCors():
  app.enableCors();

  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
