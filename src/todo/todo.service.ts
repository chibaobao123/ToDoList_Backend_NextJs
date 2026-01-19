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
  async updateTodo(data: any) {
    return new this.todoModel(data).save();
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
