import { CreateTaskDto, UpdateTaskDto } from './task.dto';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { TaskEntity } from './task.entity';

@Injectable()
export class TaskService {
  constructor(
    @InjectRepository(TaskEntity)
    private readonly taskRepository: Repository<TaskEntity>
  ) {}

  findAll() {
    return this.taskRepository.find();
  }

  findById(id: string) {
    const task = this.taskRepository.findOne({
      where: {
        id,
      },
    });
    return task;
  }

  async createTask(dto: CreateTaskDto) {
    const newTask = this.taskRepository.create(dto);
    await this.taskRepository.save(newTask);
    return newTask;
  }

  async updateTask(id: string, dto: UpdateTaskDto) {
    await this.taskRepository.update(id, dto);
    return this.taskRepository.findOne({
      where: {
        id,
      },
    });
  }

  async deleteTask(id: string) {
    const res = await this.taskRepository.delete(id);
    return res;
  }
}
