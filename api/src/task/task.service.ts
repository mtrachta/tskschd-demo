import { Injectable, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from '../auth/entities/auth.entity';
import { TaskRepository } from './task.repository';
import { CreateTaskDto } from './dto/create-task.dto';
import { GetTaskFilterDto } from './dto/get-task-filter.dto';
import { UpdateTaskDto } from './dto/update-task.dto';
import { Task } from './entities/task.entity';

@Injectable()
export class TaskService {

  // logger
  private logger = new Logger('TaskService');

  constructor(
    @InjectRepository(TaskRepository)
    private rep: TaskRepository,
  ) {
    this.logger.verbose('--- constructor ---');
  }

  async createItem(
    createDto: CreateTaskDto,
    user: User
  ): Promise<Task> {
    this.logger.verbose(`createItem->createDto: ${JSON.stringify(createDto)}`);
    this.logger.verbose(`---`);
    return this.rep.createItem(createDto, user);
  }

  async getItemCount(
    user: User
  ): Promise<Number> {
    this.logger.verbose(`getItemCount - start`);
    this.logger.verbose(`---`);
    return this.rep.getItemCount(user);
  }

  async getItems(
    filterDto: GetTaskFilterDto,
    user: User
  ): Promise<Task[]> {
    this.logger.verbose(`getItems->filterDto: ${JSON.stringify(filterDto)}`);
    this.logger.verbose(`---`);
    return this.rep.getItems(filterDto, user);
  }

  async getItem(
    id: string,
    user: User
  ): Promise<Task> {
    this.logger.verbose(`getItem->id: ${JSON.stringify(id)}`);
    this.logger.verbose(`---`);
    return this.rep.getItem(id, user);
  }

  async updateItem(
    id: string, 
    updateDto: UpdateTaskDto,
    user: User
  ): Promise<Task> {
    this.logger.verbose(`updateItem->id: ${JSON.stringify(id)}`);
    this.logger.verbose(`updateItem->body: ${JSON.stringify(updateDto)}`);
    this.logger.verbose(`---`);
    return this.rep.updateItem(id, updateDto, user);
  }

  async deleteItem(
    id: string,
    user: User
  ): Promise<void> {
    this.logger.verbose(`deleteItem->id: ${JSON.stringify(id)}`);
    this.logger.verbose(`---`);
    return this.rep.deleteItem(id, user);
  }
  //
}
