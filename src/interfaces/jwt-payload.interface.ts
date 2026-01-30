import { Role } from '../roles/roles.enum';

export interface JwtPayload {
  email: string;
  sub: string; // Đây chính là userId (ID của người dùng từ MongoDB)
  role: Role;
  iat?: number; // Issued at (thời điểm tạo token - tự động có bởi JWT)
  exp?: number; // Expiration time (thời điểm hết hạn - tự động có bởi JWT)
}
