import { User } from '../../auth/entities/auth.entity';
import { NoteStatus } from '../enum/note-status.enum';
import { NotePriority } from '../enum/note-priority.enum';
export declare class Note {
    id: string;
    title: string;
    body: string;
    status: NoteStatus;
    priority: NotePriority;
    category: string;
    taskID: string;
    created: string;
    updated: string;
    user: User;
}
