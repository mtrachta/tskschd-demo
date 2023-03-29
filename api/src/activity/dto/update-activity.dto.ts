import { IsNotEmpty, IsEnum, IsOptional, IsUUID } from 'class-validator';
import { StringifyOptions } from 'querystring';
import { ActivityPriority } from '../enum/activity-priority.enum';
import { ActivityStatus } from '../enum/activity-status.enum';

export class UpdateActivityDto {
    //
    @IsNotEmpty()
    title: string;

    @IsOptional()
    description: string;
    @IsOptional()
    note: string;

    @IsEnum(ActivityStatus)
    status: ActivityStatus;
    @IsEnum(ActivityPriority)
    priority: ActivityPriority;
    @IsOptional()
    category: string;

    @IsOptional()
    @IsUUID()
    assigneeID: string;

    @IsNotEmpty()
    startDate: number;
    @IsOptional()
    startTime: string;

    @IsOptional()
    lengthTotal: string;
    @IsOptional()
    lengthAction: string;
    //
    @IsOptional()
    place: string;
    @IsOptional()
    sources: string;
    @IsOptional()
    averagePace: string;
    @IsOptional()
    shoes: string;
    //
}
