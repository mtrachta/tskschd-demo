import { ActivityPriority } from '../enum/activity-priority.enum';
import { ActivityStatus } from '../enum/activity-status.enum';
export declare class CreateActivityDto {
    title: string;
    description: string;
    note: string;
    status: ActivityStatus;
    priority: ActivityPriority;
    category: string;
    assigneeID: string;
    startDate: number;
    startTime: string;
    lengthTotal: string;
    lengthAction: string;
    place: string;
    sources: string;
    averagePace: string;
    shoes: string;
}
