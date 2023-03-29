import { ActivityPriority } from "./activity-priority.enum";
import { ActivityStatus } from "./activity-status.enum";

export class Activity {
    //
    id!: string;
    // 
    title!: string;
    description!: string;
    //
    status!: ActivityStatus;
    priority!: ActivityPriority;
    category!: string;
    // 
    startDate!: number;
    startTime!: string;
    // 
    assigneeID!: string;
    note!: string;
    // 
    lengthTotal!: string;
    lengthAction!: string;
    // 
    place!: string; 
    sources!: string;
    averagePace!: string;
    shoes!: string;
    // 
    created!: string;
    updated!: string;
    // 
}

export interface IActivity {
    items: Activity[];
    total_count: number;
}