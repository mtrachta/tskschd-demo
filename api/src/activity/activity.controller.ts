import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, Logger, Query } from '@nestjs/common';
import { ActivityService } from './activity.service';
import { CreateActivityDto } from './dto/create-activity.dto';
import { UpdateActivityDto } from './dto/update-activity.dto';
import { AuthGuard } from '@nestjs/passport';
import { User } from 'src/auth/entities/auth.entity';
import { GetUser } from 'src/_helper/get-user.decorator';
import { Activity } from './entities/activity.entity';
import { GetActivityFilterDto } from './dto/get-activity-filter.dto';

@Controller('activity')
@UseGuards(AuthGuard())
export class ActivityController {
  //
  // logger
  private logger = new Logger('ActivityController');

  // constructor
  constructor(
    private readonly srv: ActivityService
  ) {
    this.logger.verbose('--- constructor ---');
  }

  @Post()
  createItem(
    @Body() createDto: CreateActivityDto,
    @GetUser() user: User,
  ): Promise<Activity> {
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
    @Query() filterDto: GetActivityFilterDto,
    @GetUser() user: User,
  ): Promise<Activity[]> {
    this.logger.verbose(`getItems->filterDto: ${JSON.stringify(filterDto)}`);
    this.logger.verbose(`---`);
    return this.srv.getItems(filterDto, user);
  }

  @Get('/:id')
  getItem(
    @Param('id') id: string,
    @GetUser() user: User
  ): Promise<Activity> {
    this.logger.verbose(`getItem->id: ${JSON.stringify(id)}`);
    this.logger.verbose(`---`);
    return this.srv.getItem(id, user);
  }

  @Patch('/:id')
  updateItem(
    @Param('id') id: string,
    @Body() updateDto: UpdateActivityDto,
    @GetUser() user: User,
  ): Promise<Activity> {
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
