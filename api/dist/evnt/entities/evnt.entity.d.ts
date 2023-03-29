import { User } from '../../auth/entities/auth.entity';
import { EvntStatus } from '../enum/evnt-status.enum';
import { EvntPriority } from '../enum/evnt-priority.enum';
export declare class Evnt {
    id: string;
    title: string;
    description: string;
    status: EvntStatus;
    priority: EvntPriority;
    category: string;
    start: number;
    finish: number;
    taskID: string;
    assigneeID: string;
    note: string;
    created: string;
    updated: string;
    user: User;
}
