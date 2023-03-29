import { Task } from '../../task/entities/task.entity';
import { Note } from '../../note/entities/note.entity';
import { Contact } from '../../contact/entities/contact.entity';
import { Activity } from 'src/activity/entities/activity.entity';
export declare class User {
    id: string;
    username: string;
    password: string;
    firstname: string;
    lastname: string;
    tasks: Task[];
    notes: Note[];
    contacts: Contact[];
    activities: Activity[];
}
