import { Controller, Get, Post, Body, Delete, Param } from '@nestjs/common';
import { TodoService } from './todo.service';

@Controller('todo') // Đường dẫn API sẽ là: localhost:3001/todo
export class TodoController {
  constructor(private readonly todoService: TodoService) {}

  @Post()
  create(@Body() body: any) {
    return this.todoService.create(body);
  }

  @Post()
  updateTodo(@Body() body: any) {
    return this.todoService.create(body);
  }

  @Get()
  findAll() {
    return this.todoService.findAll();
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.todoService.delete(id);
  }
}
