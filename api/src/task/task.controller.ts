import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, Logger, Query } from '@nestjs/common';
import { TaskService } from './task.service';
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';
import { AuthGuard } from '@nestjs/passport';
import { User } from 'src/auth/entities/auth.entity';
import { GetUser } from 'src/_helper/get-user.decorator';
import { Task } from './entities/task.entity';
import { GetTaskFilterDto } from './dto/get-task-filter.dto';

@Controller('task')
@UseGuards(AuthGuard())
export class TaskController {
  //
  // logger
  private logger = new Logger('TaskController');

  // constructor
  constructor(
    private readonly srv: TaskService
  ) {
    this.logger.verbose('--- constructor ---');
  }

  @Post()
  createItem(
    @Body() createDto: CreateTaskDto,
    @GetUser() user: User,
  ): Promise<Task> {
    this.logger.verbose(`createItem->createDto: ${JSON.stringify(createDto)}`);
    this.logger.verbose(`---`);
    return this.srv.createItem(createDto, user);
  }

  @Get('/count')
  getItemCount(
    @GetUser() user: User
  ): Promise<Number> {
    this.logger.verbose(`getItemCount - start`);
    this.logger.verbose(`---`);
    return this.srv.getItemCount(user);
  }

  @Get()
  getItems(
    @Query() filterDto: GetTaskFilterDto,
    @GetUser() user: User,
  ): Promise<Task[]> {
    this.logger.verbose(`getItems->filterDto: ${JSON.stringify(filterDto)}`);
    this.logger.verbose(`---`);
    return this.srv.getItems(filterDto, user);
  }

  @Get('/:id')
  getItem(
    @Param('id') id: string,
    @GetUser() user: User
  ): Promise<Task> {
    this.logger.verbose(`getItem->id: ${JSON.stringify(id)}`);
    this.logger.verbose(`---`);
    return this.srv.getItem(id, user);
  }

  @Patch('/:id')
  updateItem(
    @Param('id') id: string,
    @Body() updateDto: UpdateTaskDto,
    @GetUser() user: User,
  ): Promise<Task> {
    this.logger.verbose(`updateItem->id: ${JSON.stringify(id)}`);
    this.logger.verbose(`updateItem->body: ${JSON.stringify(updateDto)}`);
    this.logger.verbose(`---`);
    return this.srv.updateItem(id, updateDto, user);
  }

  @Delete('/:id')
  deleteItem(
    @Param('id') id: string,
    @GetUser() user: User
  ): Promise<void> {
    this.logger.verbose(`deleteItem->id: ${JSON.stringify(id)}`);
    this.logger.verbose(`---`);
    return this.srv.deleteItem(id, user);
  }
  //
}
