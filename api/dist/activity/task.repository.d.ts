import { User } from "../auth/entities/auth.entity";
import { Repository } from "typeorm";
import { CreateTaskDto } from "./dto/create-task.dto";
import { GetTaskFilterDto } from "./dto/get-task-filter.dto";
import { UpdateTaskDto } from "./dto/update-task.dto";
import { Task } from "./entities/task.entity";
export declare class TaskRepository extends Repository<Task> {
    private result;
    private logger;
    constructor();
    createItem(createDto: CreateTaskDto, user: User): Promise<Task>;
    getItemCount(user: User): Promise<Number>;
    getItems(filterDto: GetTaskFilterDto, user: User): Promise<Task[]>;
    getItem(id: string, user: User): Promise<Task>;
    updateItem(id: string, updateDto: UpdateTaskDto, user: User): Promise<Task>;
    deleteItem(id: string, user: User): Promise<void>;
}
