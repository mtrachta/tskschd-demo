import { IsNotEmpty, IsEnum, IsOptional, IsUUID } from 'class-validator';
import { TaskPriority } from '../enum/task-priority.enum';
import { TaskStatus } from '../enum/task-status.enum';

export class CreateTaskDto {
    // 
    @IsNotEmpty()
    title: string;

    @IsOptional()
    description: string;
    @IsOptional()
    note: string;

    @IsEnum(TaskStatus)
    status: TaskStatus;
    @IsEnum(TaskPriority)
    priority: TaskPriority;
    @IsOptional()
    category: string;

    @IsOptional()
    @IsUUID()
    taskID: string;

    @IsOptional()
    @IsUUID()
    assigneeID: string;

    @IsNotEmpty()
    start: number;

    @IsNotEmpty()
    finish: number;
    //   


}