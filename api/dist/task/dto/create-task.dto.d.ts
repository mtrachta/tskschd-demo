import { TaskPriority } from '../enum/task-priority.enum';
import { TaskStatus } from '../enum/task-status.enum';
export declare class CreateTaskDto {
    title: string;
    description: string;
    note: string;
    status: TaskStatus;
    priority: TaskPriority;
    category: string;
    taskID: string;
    assigneeID: string;
    start: number;
    finish: number;
}
