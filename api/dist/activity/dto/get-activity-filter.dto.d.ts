import { ActivityPriority } from '../enum/activity-priority.enum';
import { ActivityStatus } from '../enum/activity-status.enum';
export declare class GetActivityFilterDto {
    status?: ActivityStatus;
    priority?: ActivityPriority;
    search?: string;
}
