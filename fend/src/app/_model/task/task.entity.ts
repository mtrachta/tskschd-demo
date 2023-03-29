import { TaskPriority } from "./task-priority.enum";
import { TaskStatus } from "./task-status.enum";

export class Task {
    //
    id!: string;
    // 
    title!: string;
    description!: string;
    //
    status!: TaskStatus;
    priority!: TaskPriority;
    category!: string;
    // 
    start!: number;
    finish!: number;
    // 
    assigneeID!: string;
    note!: string;
    // 
    created!: string;
    updated!: string;
    // 
}

export interface ITask {
    items: Task[];
    total_count: number;
}