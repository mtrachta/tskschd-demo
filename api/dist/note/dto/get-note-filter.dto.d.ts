import { NotePriority } from '../enum/note-priority.enum';
import { NoteStatus } from '../enum/note-status.enum';
export declare class GetNoteFilterDto {
    status?: NoteStatus;
    priority?: NotePriority;
    search?: string;
}
