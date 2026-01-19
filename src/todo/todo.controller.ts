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

  @Patch(':id/status') // Đường dẫn: localhost:3001/todo/ID_CUA_BAN/status
  updateStatus(@Param('id') id: string, @Body('status') status: number) {
    return this.todoService.updateStatus(id, status);
  }

  @Get()
  findAll() {
    return this.todoService.findAll();
  }

  @Delete(':id') // Đường dẫn: localhost:3001/todo/ID_CUA_BAN
  remove(@Param('id') id: string) {
    return this.todoService.delete(id);
  }
}
