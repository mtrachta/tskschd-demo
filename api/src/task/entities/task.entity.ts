import { Exclude } from 'class-transformer';
import { User } from '../../auth/entities/auth.entity';
import { Column, CreateDateColumn, Entity, ManyToOne, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm';
import { TaskStatus } from '../enum/task-status.enum';
import { TaskPriority } from '../enum/task-priority.enum';

@Entity()
export class Task {
  
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  title: string;

  @Column({ type: 'text', nullable: true })
  description: string;

  @Column()
  status: TaskStatus;

  @Column()
  priority: TaskPriority;

  @Column({ nullable: true })
  category: string;

  @Column({ type: 'bigint' })
  start: number;

  @Column({ type: 'bigint' })
  finish: number;

  // @Column({ type: 'varchar', length: 36, nullable: true })
  // taskID: string;

  // @Column({ type: 'varchar', length: 36, nullable: true })
  // projectID: string;

  @Column({ type: 'varchar', length: 36, nullable: true })
  assigneeID: string;

  @Column({ type: 'text', nullable: true })
  note: string;

  // @ManyToOne((_type) => Task, (task) => task.tasks)
  // @Exclude({ toPlainOnly: true })
  // task: Task;

  @CreateDateColumn()
  created: string;

  @UpdateDateColumn()
  updated: string;

  // @ManyToOne((_type) => User, (user) => user.tasks, { eager: false })
  @ManyToOne((_type) => User, (user) => user.tasks,)
  @Exclude({ toPlainOnly: true })
  user: User;

}
