import { Injectable, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from '../auth/entities/auth.entity';
import { ActivityRepository } from './activity.repository';
import { CreateActivityDto } from './dto/create-activity.dto';
import { GetActivityFilterDto } from './dto/get-activity-filter.dto';
import { UpdateActivityDto } from './dto/update-activity.dto';
import { Activity } from './entities/activity.entity';

@Injectable()
export class ActivityService {

  // logger
  private logger = new Logger('ActivityService');

  constructor(
    @InjectRepository(ActivityRepository)
    private rep: ActivityRepository,
  ) {
    this.logger.verbose('--- constructor ---');
  }

  async createItem(
    createDto: CreateActivityDto,
    user: User
  ): Promise<Activity> {
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
    filterDto: GetActivityFilterDto,
    user: User
  ): Promise<Activity[]> {
    this.logger.verbose(`getItems->filterDto: ${JSON.stringify(filterDto)}`);
    this.logger.verbose(`---`);
    return this.rep.getItems(filterDto, user);
  }

  async getItem(
    id: string,
    user: User
  ): Promise<Activity> {
    this.logger.verbose(`getItem->id: ${JSON.stringify(id)}`);
    this.logger.verbose(`---`);
    return this.rep.getItem(id, user);
  }

  async updateItem(
    id: string,
    updateDto: UpdateActivityDto,
    user: User
  ): Promise<Activity> {
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
