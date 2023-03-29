import { NoteService } from './note.service';
import { CreateNoteDto } from './dto/create-note.dto';
import { UpdateNoteDto } from './dto/update-note.dto';
import { User } from 'src/auth/entities/auth.entity';
import { Note } from './entities/note.entity';
import { GetNoteFilterDto } from './dto/get-note-filter.dto';
export declare class NoteController {
    private readonly srv;
    private logger;
    constructor(srv: NoteService);
    createItem(createDto: CreateNoteDto, user: User): Promise<Note>;
    getItemCount(user: User): Promise<Number>;
    getItems(filterDto: GetNoteFilterDto, user: User): Promise<Note[]>;
    getItem(id: string, user: User): Promise<Note>;
    updateItem(id: string, updateDto: UpdateNoteDto, user: User): Promise<Note>;
    deleteItem(id: string, user: User): Promise<void>;
}
