import { IsNotEmpty, IsEnum, IsOptional, IsEmail, IsPhoneNumber, IsUUID } from 'class-validator';
import { NotePriority } from '../enum/note-priority.enum';
import { NoteStatus } from '../enum/note-status.enum';

export class CreateNoteDto {
    // 
    @IsNotEmpty()
    title: string;
    @IsOptional()
    body: string;

    @IsEnum(NoteStatus)
    status: NoteStatus;
    @IsEnum(NotePriority)
    priority: NotePriority;
    @IsOptional()
    category: string;

    @IsOptional()
    @IsUUID()
    taskID: string;
    //   
}