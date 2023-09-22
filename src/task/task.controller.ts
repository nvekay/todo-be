import {
  Body,
  Get,
  Post,
  UsePipes,
  Param,
  ValidationPipe,
  Delete,
  Controller,
  Patch,
  HttpException,
} from '@nestjs/common';
import { CreateTaskDto, UpdateTaskDto } from './task.dto';
import { TaskService } from './task.service';

@Controller('task')
export class TaskController {
  constructor(private readonly taskService: TaskService) {}

  @UsePipes(new ValidationPipe())
  @Get()
  findAll() {
    const allTask = this.taskService.findAll();
    return allTask;
  }

  @Get(':id')
  findById(@Param('id') id: string) {
    const task = this.taskService.findById(id);
    return task;
  }

  @UsePipes(new ValidationPipe())
  @Post('create')
  createTask(@Body() dto: CreateTaskDto) {
    const task = this.taskService.createTask(dto);
    return task;
  }

  @UsePipes(new ValidationPipe())
  @Patch(':id')
  updateTask(@Param('id') id: string, @Body() dto: UpdateTaskDto) {
    if (Object.keys(dto).length === 0) {
      throw new HttpException('Body cannot be empty', 400);
    }
    const task = this.taskService.updateTask(id, dto);
    return task;
  }

  @Delete(':id')
  deleteTask(@Param('id') id: string) {
    return this.taskService.deleteTask(id);
  }
}
