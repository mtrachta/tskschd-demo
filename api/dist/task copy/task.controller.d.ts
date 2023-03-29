import { TaskService } from './task.service';
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';
import { User } from 'src/auth/entities/auth.entity';
import { Task } from './entities/task.entity';
import { GetTaskFilterDto } from './dto/get-task-filter.dto';
export declare class TaskController {
    private readonly srv;
    private logger;
    constructor(srv: TaskService);
    createItem(createDto: CreateTaskDto, user: User): Promise<Task>;
    getItemCount(user: User): Promise<Number>;
    getItems(filterDto: GetTaskFilterDto, user: User): Promise<Task[]>;
    getItem(id: string, user: User): Promise<Task>;
    updateItem(id: string, updateDto: UpdateTaskDto, user: User): Promise<Task>;
    deleteItem(id: string, user: User): Promise<void>;
}
