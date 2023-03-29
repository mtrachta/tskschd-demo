import { User } from "../auth/entities/auth.entity";
import { Repository } from "typeorm";
import { CreateActivityDto } from "./dto/create-activity.dto";
import { GetActivityFilterDto } from "./dto/get-activity-filter.dto";
import { UpdateActivityDto } from "./dto/update-activity.dto";
import { Activity } from "./entities/activity.entity";
export declare class ActivityRepository extends Repository<Activity> {
    private result;
    private logger;
    constructor();
    createItem(createDto: CreateActivityDto, user: User): Promise<Activity>;
    getItemCount(user: User): Promise<Number>;
    getItems(filterDto: GetActivityFilterDto, user: User): Promise<Activity[]>;
    getItem(id: string, user: User): Promise<Activity>;
    updateItem(id: string, updateDto: UpdateActivityDto, user: User): Promise<Activity>;
    deleteItem(id: string, user: User): Promise<void>;
}
