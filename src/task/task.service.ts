import { TaskEntity } from 'src/task/task.entity';
import { CreateTaskDto, UpdateTaskDto } from './task.dto';
import { BadRequestException, HttpException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { TaskStatus } from './task.interface';

@Injectable()
export class TaskService {
  constructor(
    @InjectRepository(TaskEntity)
    private readonly taskRepository: Repository<TaskEntity>
  ) {}

  async findAll(
    param: TaskStatus = TaskStatus.All,
    page: number = 1,
    limit: number = 12
  ) {
    const filterWhere =
      param !== TaskStatus.All
        ? {
            completed: param === TaskStatus.Completed,
          }
        : {};

    const [tasks, count]: [TaskEntity[], number] =
      await this.taskRepository.findAndCount({
        where: {
          ...filterWhere,
        },
        order: {
          createdAt: 'DESC',
        },
        skip: (page - 1) * limit,
        take: limit,
      });

    return {
      count,
      tasks,
    };
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
    try {
      const newTask = await this.taskRepository.save(dto);
      return newTask;
    } catch (e) {
      throw new BadRequestException('Task with this name already exist');
    }
  }

  async updateTask(id: string, dto: UpdateTaskDto) {
    try {
      const updatedTask = await this.taskRepository.save({ ...dto, id });
      return updatedTask;
    } catch (e) {
      throw new BadRequestException('Task with this name already exist');
    }
  }

  async deleteTask(id: string) {
    const res = await this.taskRepository.delete(id);
    return res;
  }
}
