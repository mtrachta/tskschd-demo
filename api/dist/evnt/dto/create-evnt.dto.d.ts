import { EvntPriority } from '../enum/evnt-priority.enum';
import { EvntStatus } from '../enum/evnt-status.enum';
export declare class CreateEvntDto {
    title: string;
    description: string;
    status: EvntStatus;
    priority: EvntPriority;
    category: string;
    parentID: string;
    start: number;
    finish: number;
    taskID: string;
    assigneeID: string;
    note: string;
}
