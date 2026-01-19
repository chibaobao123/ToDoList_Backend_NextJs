import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Todo } from './todo.schema';

@Injectable()
export class TodoService {
  constructor(@InjectModel(Todo.name) private todoModel: Model<Todo>) {}

  // Thêm mới
  async create(data: any) {
    return new this.todoModel(data).save();
  }

  // Update mới
  async updateStatus(id: string, status: number) {
    // { new: true } để Mongoose trả về đối tượng sau khi đã cập nhật
    return this.todoModel
      .findByIdAndUpdate(id, { status: status }, { new: true })
      .exec();
  }

  // Lấy danh sách
  async findAll() {
    return this.todoModel.find().exec();
  }

  // Xóa
  async delete(id: string) {
    return this.todoModel.findByIdAndDelete(id);
  }
}
