import { Exclude } from 'class-transformer';
import { User } from '../../auth/entities/auth.entity';
import { Column, CreateDateColumn, Entity, ManyToOne, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm';
import { ContactStatus } from '../enum/contact-status.enum';
import { ContactTitle } from '../enum/contact-title.enum';

@Entity()
export class Contact {
    // 
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column({ nullable: false })
    title: ContactTitle;

    @Column({ nullable: true })
    firstname: string;
    @Column({ nullable: false })
    lastname: string;

    @Column({ nullable: true })
    email: string;
    @Column({ nullable: true })
    phone: string;

    @Column({ nullable: true })
    position: string;
    @Column({ nullable: true })
    organisation: string;

    @Column({ nullable: false })
    status: ContactStatus;
    @Column({ nullable: true })
    category: string;

    @Column({ type: 'varchar', length: 36, nullable: true })
    parentID: string;

    @Column({ type: 'text', nullable: true })
    note: string;

    @CreateDateColumn()
    created: string;
    @UpdateDateColumn()
    updated: string;

    // @ManyToOne((_type) => User, (user) => user.contacts, { eager: false })
    @ManyToOne((_type) => User, (user) => user.contacts)
    @Exclude({ toPlainOnly: true })
    user: User;

}
