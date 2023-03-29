import { NotePriority } from '../enum/note-priority.enum';
import { NoteStatus } from '../enum/note-status.enum';
export declare class CreateNoteDto {
    title: string;
    body: string;
    status: NoteStatus;
    priority: NotePriority;
    category: string;
    taskID: string;
}
