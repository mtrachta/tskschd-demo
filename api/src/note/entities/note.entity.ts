import { Exclude } from 'class-transformer';
import { User } from '../../auth/entities/auth.entity';
import { Column, CreateDateColumn, Entity, ManyToOne, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm';
import { NoteStatus } from '../enum/note-status.enum';
import { NotePriority } from '../enum/note-priority.enum';

@Entity()
export class Note {
    // 
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column({ nullable: false })
    title: string;

    @Column({ nullable: true })
    body: string;

    @Column({ nullable: false })
    status: NoteStatus;
    @Column({ nullable: false })
    priority: NotePriority;
    @Column({ nullable: true })
    category: string;

    @Column({ type: 'varchar', length: 36, nullable: true })
    taskID: string;

    // @Column({ type: 'varchar', length: 36, nullable: true })
    // projectID: string;

    @CreateDateColumn()
    created: string;

    @UpdateDateColumn()
    updated: string;

    // @ManyToOne((_type) => User, (user) => user.contacts, { eager: false })
    @ManyToOne((_type) => User, (user) => user.notes)
    @Exclude({ toPlainOnly: true })
    user: User;

}
