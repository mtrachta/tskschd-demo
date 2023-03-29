import { User } from '../../auth/entities/auth.entity';
import { TaskStatus } from '../enum/task-status.enum';
import { TaskPriority } from '../enum/task-priority.enum';
export declare class Task {
    id: string;
    title: string;
    description: string;
    status: TaskStatus;
    priority: TaskPriority;
    category: string;
    start: number;
    finish: number;
    assigneeID: string;
    note: string;
    created: string;
    updated: string;
    user: User;
}
