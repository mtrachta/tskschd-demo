import { Exclude } from 'class-transformer';
import { User } from '../../auth/entities/auth.entity';
import { Column, CreateDateColumn, Entity, ManyToOne, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm';
import { ActivityStatus } from '../enum/activity-status.enum';
import { ActivityPriority } from '../enum/activity-priority.enum';

@Entity()
export class Activity {
  
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  title: string;

  @Column({ type: 'text', nullable: true })
  description: string;

  @Column()
  status: ActivityStatus;

  @Column()
  priority: ActivityPriority;

  @Column({ nullable: true })
  category: string;

  @Column({ type: 'bigint' })
  startDate: number;

  @Column({ type: 'varchar', length: 50, nullable: true })
  startTime: string;

  @Column({ type: 'varchar', length: 50, nullable: true })
  lengthTotal: string;

  @Column({ type: 'varchar', length: 50, nullable: true })
  lengthAction: string;

  @Column({ type: 'varchar', length: 150, nullable: true })
  place: string;

  @Column({ type: 'varchar', length: 200, nullable: true })
  sources: string;

  @Column({ type: 'varchar', length: 50, nullable: true })
  averagePace: string;

  @Column({ type: 'varchar', length: 150, nullable: true })
  shoes: string;

  @Column({ type: 'varchar', length: 36, nullable: true })
  assigneeID: string;

  @Column({ type: 'text', nullable: true })
  note: string;

  @CreateDateColumn()
  created: string;

  @UpdateDateColumn()
  updated: string;

  // @ManyToOne((_type) => User, (user) => user.activitys, { eager: false })
  @ManyToOne((_type) => User, (user) => user.activities,)
  @Exclude({ toPlainOnly: true })
  user: User;

}
