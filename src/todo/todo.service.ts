import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Todo } from '../schemas/todo.schema';

@Injectable()
export class TodoService {
  constructor(@InjectModel(Todo.name) private todoModel: Model<Todo>) {}

  // Thêm mới
  async create(data: Todo, userId: string) {
    const todo = new this.todoModel({
      ...data,
      userId,
    });
    return todo.save();
  }

  // Update mới
  async updateStatus(data: Todo) {
    // { new: true } để Mongoose trả về đối tượng sau khi đã cập nhật
    return this.todoModel
      .findByIdAndUpdate(data._id, { status: data.status }, { new: true })
      .exec();
  }

  // Lấy danh sách
  async findAll() {
    return this.todoModel.find({ active: true }).exec();
  }

  // Xóa
  async delete(_id: string) {
    // { new: true } để Mongoose trả về đối tượng sau khi đã cập nhật
    return this.todoModel
      .findByIdAndUpdate(_id, { active: false }, { new: true })
      .exec();
  }

  // Xóa tất cả Todo đã hoàn thành
  async removeAllCompleted() {
    // Tìm tất cả Todo có status là 1 và cập nhật active thành false
    return this.todoModel.updateMany({ status: 1 }, { active: false }).exec();
  }

  async findMyTodos(userId: string) {
    return this.todoModel.find({
      userId,
      active: true,
    });
  }
}
