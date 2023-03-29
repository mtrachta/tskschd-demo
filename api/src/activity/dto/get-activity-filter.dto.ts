import { IsEnum, IsOptional, IsString, IsUUID } from 'class-validator';
import { ActivityPriority } from '../enum/activity-priority.enum';
import { ActivityStatus } from '../enum/activity-status.enum';

export class GetActivityFilterDto {
  @IsOptional()
  @IsEnum(ActivityStatus)
  status?: ActivityStatus;

  @IsOptional()
  @IsEnum(ActivityPriority)
  priority?: ActivityPriority;

  @IsOptional()
  @IsString()
  search?: string;
}