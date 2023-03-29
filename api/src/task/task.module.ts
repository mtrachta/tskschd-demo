import { Module } from '@nestjs/common';
import { TaskService } from './task.service';
import { AuthModule } from '../auth/auth.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TaskController } from './task.controller';
import { TaskRepository } from './task.repository';

@Module({
  imports: [
    TypeOrmModule.forFeature([ TaskRepository ]),
    AuthModule,
  ],
  controllers: [TaskController],
  providers: [TaskService]
})
export class TaskModule {}
