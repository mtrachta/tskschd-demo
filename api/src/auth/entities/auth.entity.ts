import { Task } from '../../task/entities/task.entity';
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { UserStatus } from '../enum/user-status.enum';
import { Note } from '../../note/entities/note.entity';
import { Contact } from '../../contact/entities/contact.entity';
import { Activity } from 'src/activity/entities/activity.entity';

@Entity()
export class User {
    // 
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column({ unique: true })
    username: string;

    @Column()
    password: string;

    // @Column()
    // status: UserStatus;

    @Column()
    firstname: string;
    @Column()
    lastname: string;

    // @OneToMany((_type) => Project, (project) => project.user, { eager: true })
    @OneToMany((_type) => Task, (task) => task.user,)
    tasks: Task[];

    // @OneToMany((_type) => Project, (project) => project.user,)
    // projects: Project[];

    @OneToMany((_type) => Note, (note) => note.user,)
    notes: Note[];

    @OneToMany((_type) => Contact, (contact) => contact.user,)
    contacts: Contact[];

    @OneToMany((_type) => Activity, (activity) => activity.user,)
    activities: Activity[];
    
}   