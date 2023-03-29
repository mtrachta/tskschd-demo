import { User } from '../../auth/entities/auth.entity';
import { ActivityStatus } from '../enum/activity-status.enum';
import { ActivityPriority } from '../enum/activity-priority.enum';
export declare class Activity {
    id: string;
    title: string;
    description: string;
    status: ActivityStatus;
    priority: ActivityPriority;
    category: string;
    startDate: number;
    startTime: string;
    lengthTotal: string;
    lengthAction: string;
    place: string;
    sources: string;
    averagePace: string;
    shoes: string;
    assigneeID: string;
    note: string;
    created: string;
    updated: string;
    user: User;
}
