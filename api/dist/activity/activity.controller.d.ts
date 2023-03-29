import { ActivityService } from './activity.service';
import { CreateActivityDto } from './dto/create-activity.dto';
import { UpdateActivityDto } from './dto/update-activity.dto';
import { User } from 'src/auth/entities/auth.entity';
import { Activity } from './entities/activity.entity';
import { GetActivityFilterDto } from './dto/get-activity-filter.dto';
export declare class ActivityController {
    private readonly srv;
    private logger;
    constructor(srv: ActivityService);
    createItem(createDto: CreateActivityDto, user: User): Promise<Activity>;
    getItemCount(user: User): Promise<Number>;
    getItems(filterDto: GetActivityFilterDto, user: User): Promise<Activity[]>;
    getItem(id: string, user: User): Promise<Activity>;
    updateItem(id: string, updateDto: UpdateActivityDto, user: User): Promise<Activity>;
    deleteItem(id: string, user: User): Promise<void>;
}
