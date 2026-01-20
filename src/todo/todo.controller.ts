import {
  Controller,
  Get,
  Post,
  Body,
  Delete,
  Param,
  Patch,
} from '@nestjs/common';
import { TodoService } from './todo.service';

@Controller('todo') // Đường dẫn API sẽ là: localhost:3001/todo
export class TodoController {
  constructor(private readonly todoService: TodoService) {}

  @Post()
  create(@Body() body: any) {
    return this.todoService.create(body);
  }

  @Patch()
  updateStatus(@Body() body: any) {
    return this.todoService.updateStatus(body);
  }

  @Get()
  findAll() {
    return this.todoService.findAll();
  }

  @Delete(':_id') // Đường dẫn: localhost:3001/todo/ID_CUA_BAN
  delete(@Param('_id') _id: string) {
    return this.todoService.delete(_id);
  }

  @Patch('remove-completed') // Đường dẫn: http://localhost:3001/todo/remove-completed
  async removeCompleted() {
    return this.todoService.removeAllCompleted();
  }
}
