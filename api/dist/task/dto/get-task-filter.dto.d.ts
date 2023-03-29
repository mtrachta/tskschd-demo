import { TaskPriority } from '../enum/task-priority.enum';
import { TaskStatus } from '../enum/task-status.enum';
export declare class GetTaskFilterDto {
    status?: TaskStatus;
    priority?: TaskPriority;
    search?: string;
}
