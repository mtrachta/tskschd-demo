import { NotePriority } from "./note-priority.enum";
import { NoteStatus } from "./note-status.enum";

export class Note {
    //
    id!: string;
    // 
    title!: string;
    body!: string;
    //
    status!: NoteStatus;
    priority!: NotePriority;
    category!: string;
    // 
    created!: string;
    updated!: string;
    // 
    taskID!: string;
    // 
}

export interface INote {
    items: Note[];
    total_count: number;
}