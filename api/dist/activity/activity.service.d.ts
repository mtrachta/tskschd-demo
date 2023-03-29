import { User } from '../auth/entities/auth.entity';
import { ActivityRepository } from './activity.repository';
import { CreateActivityDto } from './dto/create-activity.dto';
import { GetActivityFilterDto } from './dto/get-activity-filter.dto';
import { UpdateActivityDto } from './dto/update-activity.dto';
import { Activity } from './entities/activity.entity';
export declare class ActivityService {
    private rep;
    private logger;
    constructor(rep: ActivityRepository);
    createItem(createDto: CreateActivityDto, user: User): Promise<Activity>;
    getItemCount(user: User): Promise<Number>;
    getItems(filterDto: GetActivityFilterDto, user: User): Promise<Activity[]>;
    getItem(id: string, user: User): Promise<Activity>;
    updateItem(id: string, updateDto: UpdateActivityDto, user: User): Promise<Activity>;
    deleteItem(id: string, user: User): Promise<void>;
}
