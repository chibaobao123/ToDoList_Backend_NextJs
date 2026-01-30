import { Injectable, BadRequestException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose/dist/common/mongoose.decorators';
import { Model } from 'mongoose';
import { User } from '../schemas/users.schema';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UsersService {
  constructor(@InjectModel(User.name) private userModel: Model<User>) {}

  async register(userDto: User) {
    // 1. Kiểm tra email đã tồn tại chưa
    const existingUser = await this.userModel.findOne({ email: userDto.email });
    if (existingUser) {
      throw new BadRequestException('Email đã tồn tại!');
    }

    // 2. Mã hóa mật khẩu
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(userDto.password, salt);

    // 3. Tạo user mới với mật khẩu đã băm
    const newUser = new this.userModel({
      email: userDto.email,
      password: hashedPassword,
    });

    return newUser.save();
  }

  findByEmail(email: string): Promise<User | null> {
    return this.userModel.findOne({ email }).exec();
  }

  async createGoogleUser(googleUser: {
    email: string;
    name: string;
  }): Promise<User> {
    const newUser = new this.userModel({
      email: googleUser.email,
      name: googleUser.name,
      password: '', // Không cần mật khẩu cho user Google
    });
    return newUser.save();
  }
}
