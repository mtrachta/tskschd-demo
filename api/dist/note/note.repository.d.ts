import { User } from "../auth/entities/auth.entity";
import { Repository } from "typeorm";
import { CreateNoteDto } from "./dto/create-note.dto";
import { GetNoteFilterDto } from "./dto/get-note-filter.dto";
import { UpdateNoteDto } from "./dto/update-note.dto";
import { Note } from "./entities/note.entity";
export declare class NoteRepository extends Repository<Note> {
    private result;
    private logger;
    constructor();
    createItem(createDto: CreateNoteDto, user: User): Promise<Note>;
    getItemCount(user: User): Promise<Number>;
    getItems(filterDto: GetNoteFilterDto, user: User): Promise<Note[]>;
    getItem(id: string, user: User): Promise<Note>;
    updateItem(id: string, updateDto: UpdateNoteDto, user: User): Promise<Note>;
    deleteItem(id: string, user: User): Promise<void>;
}
