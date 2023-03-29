import { IsEnum, IsOptional, IsString, IsUUID } from 'class-validator';
import { TaskPriority } from '../enum/task-priority.enum';
import { TaskStatus } from '../enum/task-status.enum';

export class GetTaskFilterDto {
  @IsOptional()
  @IsEnum(TaskStatus)
  status?: TaskStatus;

  @IsOptional()
  @IsEnum(TaskPriority)
  priority?: TaskPriority;

  @IsOptional()
  @IsString()
  search?: string;
}