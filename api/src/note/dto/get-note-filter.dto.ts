import { IsEnum, IsOptional, IsString, IsUUID } from 'class-validator';
import { NotePriority } from '../enum/note-priority.enum';
import { NoteStatus } from '../enum/note-status.enum';

export class GetNoteFilterDto {
  @IsOptional()
  @IsEnum(NoteStatus)
  status?: NoteStatus;

  @IsOptional()
  @IsEnum(NotePriority)
  priority?: NotePriority;

  @IsOptional()
  @IsString()
  search?: string;
}