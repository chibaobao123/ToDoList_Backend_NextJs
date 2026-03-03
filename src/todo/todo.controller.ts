import {
  Controller,
  Get,
  Post,
  Body,
  Delete,
  Param,
  Patch,
  Req,
  UseGuards,
} from '@nestjs/common';
import type { RequestWithUser } from '../interfaces/user.interface';
import { TodoService } from './todo.service';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { RolesGuard } from '../auth/roles.guard';
import { Roles } from '../roles/roles.decorator';
import { Role } from '../roles/roles.enum';

@UseGuards(JwtAuthGuard)
@Controller('todo') // Đường dẫn API sẽ là: localhost:3001/todo
export class TodoController {
  constructor(private readonly todoService: TodoService) {}

  @Post()
  create(@Body() body: any, @Req() req: RequestWithUser) {
    return this.todoService.create(body, req.user.userId);
  }

  @Patch()
  updateStatus(@Body() body: any) {
    return this.todoService.updateStatus(body);
  }

  @UseGuards(RolesGuard) // Chỉ cho phép admin truy cập
  @Roles(Role.ADMIN)
  @Get('/allTodo')
  findAll() {
    return this.todoService.findAll();
  }

  @Get()
  findMyTodos(@Req() req: RequestWithUser) {
    return this.todoService.findMyTodos(req.user.userId);
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
