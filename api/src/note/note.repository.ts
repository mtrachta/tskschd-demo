import { ConflictException, InternalServerErrorException, Logger, NotFoundException } from "@nestjs/common";
import { User } from "../auth/entities/auth.entity";
import { Connection, EntityRepository, Repository } from "typeorm";
import { CreateNoteDto } from "./dto/create-note.dto";
import { GetNoteFilterDto } from "./dto/get-note-filter.dto";
import { UpdateNoteDto } from "./dto/update-note.dto";
import { Note } from "./entities/note.entity";

@EntityRepository(Note)
export class NoteRepository extends Repository<Note> {

    private result!: any;

    // logger
    private logger = new Logger('NoteRepository');

    // constructor
    constructor() {
        super();
        this.logger.verbose('--- constructor ---');
    }


    async createItem(
        createDto: CreateNoteDto,
        user: User
    ): Promise<Note> {

        const { title, body, status, priority, category, taskID } = createDto;

        const note: Note = new Note();

        note.title = title;
        note.body = body;
        note.status = status;
        note.priority = priority;
        note.category = category;
        note.taskID = taskID;
        note.user = user;
        //
        try {
            this.logger.verbose(`createItem -> try-catch -> note: ${JSON.stringify(note)}`);
            this.logger.verbose(`---`);
            return await this.save(note);
        } catch (error) {
            this.logger.error(`createItem -> ERROR: ${JSON.stringify(error)}`);
            this.logger.verbose(`---`);
            throw new InternalServerErrorException();
        }
        //
    }

    async getItemCount(
        user: User
    ): Promise<Number> {

        const query = this.createQueryBuilder('task');
        query.where({ user });

        try {
            this.logger.verbose(`getItemCount -> try-catch starts`);
            this.logger.verbose(`---`);

            return await query.getCount();

        } catch (error) {
            this.logger.error(`getItemCount -> ERROR: ${JSON.stringify(error)}`);
            this.logger.verbose(`---`);
            throw new InternalServerErrorException();
        }


    }

    async getItems(
        filterDto: GetNoteFilterDto,
        user: User
    ): Promise<Note[]> {
        //
        const { status, priority, search } = filterDto;
        const query = this.createQueryBuilder('note');
        query.where({ user });

        if (status) {
            console.log(`GetItems.status: ${JSON.stringify(status)}`);
            query.andWhere('note.status = :status', { status });
        }
        if (priority) {
            console.log(`GetItems.priority: ${JSON.stringify(priority)}`);
            query.andWhere('note.priority = :priority', { priority });
        }

        if (search) {
            query.andWhere(
                '(LOWER(note.title) LIKE LOWER(:search) OR ' +
                'LOWER(note.body) LIKE LOWER(:search) OR ' +
                'LOWER(note.category) LIKE LOWER(:search) OR ' +
                'LOWER(note.note) LIKE LOWER(:search))',
                { search: `%${search}%` },
            );
        }

        try {
            this.logger.verbose(`getItems -> try-catch -> filterDto: ${JSON.stringify(filterDto)}`);
            this.logger.verbose(`---`);
            return await query.getMany();
        } catch (error) {
            this.logger.error(`getItems -> ERROR: ${JSON.stringify(error)}`);
            this.logger.verbose(`---`);
            throw new InternalServerErrorException();
        }

    }

    async getItem(
        id: string,
        user: User
    ): Promise<Note> {
        //
        var found!: any;
        //
        try {
            this.logger.verbose(`getItem -> try-catch -> id: ${JSON.stringify(id)}`);
            this.logger.verbose(`---`);
            found = await this.findOne({ where: { id, user } });
        } catch (error) {
            this.logger.error(`getItems -> ERROR: ${JSON.stringify(error)}`);
            this.logger.verbose(`---`);
            throw new InternalServerErrorException(error);
        }
        //
        if (!found) {
            this.logger.error(`getItem -> Item not found - id: ${id}`);
            this.logger.verbose(`---`);
            throw new NotFoundException(`Note with ID ${id} not found`);
        }
        this.logger.verbose(`getItem -> found : ${JSON.stringify(found)}`);
        this.logger.verbose(`---`);
        return found;
        //
    }

    async updateItem(
        id: string,
        updateDto: UpdateNoteDto,
        user: User
    ): Promise<Note> {
        //
        var note!: any;
        //
        const { title, body, status, priority, category, taskID } = updateDto;

        try {
            this.logger.verbose(`updateItem->try-catch->id: ${JSON.stringify(id)}`);
            this.logger.verbose(`updateItem->try-catch->updateDto: ${JSON.stringify(updateDto)}`);
            this.logger.verbose(`---`);
                note = await this.findOne({ where: { id, user } });
        } catch (error) {
            this.logger.error(`updateItem -> getItem -> ERROR: ${JSON.stringify(error)}`);
            this.logger.verbose(`---`);
            throw new InternalServerErrorException(error);
        }
        if (!note) {
            this.logger.error(`updateItem -> getItem -> Item not found - id: ${id}`);
            this.logger.verbose(`---`);
            throw new NotFoundException(`Note with ID ${id} not found`);
        }
        //
        note.id = id;
        //
        if (title !== undefined) { note.title = title; }
        if (body !== undefined) { note.body = body; }
        if (status !== undefined) { note.status = status; }
        if (priority !== undefined) { note.priority = priority; }
        if (category !== undefined) { note.category = category; }
        if (taskID !== undefined) { note.taskID = taskID; }

        note.user = user;

        this.logger.verbose(`updateItem->note->before save: ${JSON.stringify(note)}`);
        this.logger.verbose(`---`);

        try {
            this.logger.verbose(`updateItem->try-catch->note->before save: ${JSON.stringify(note)}`);
            this.logger.verbose(`---`);
            await this.save(note);

            this.logger.verbose(`updateItem succesfully saved...`);
            this.logger.verbose(`---`);
            return note;
        } catch (error) {
            this.logger.error(`updateItem UNSUCCESFULLY finished -> ERROR: ${JSON.stringify(error)}`);
            this.logger.verbose(`---`);
            throw new InternalServerErrorException();
        }

    }

    async deleteItem(
        id: string,
        user: User
    ): Promise<void> {
        //
        var res!: any;
        //
        try {
            this.logger.verbose(`deleteItem -> try-catch -> id: ${JSON.stringify(id)}`);
            this.logger.verbose(`---`);
            res = await this.delete({ id, user });
        } catch (error) {
            this.logger.error(`deleteItem -> ERROR: ${JSON.stringify(error)}`);
            this.logger.verbose(`---`);
            throw new InternalServerErrorException(error);
        }
        //
        if (res.affected === 0) {
            this.logger.error(`deleteItem -> not found ERROR: ${JSON.stringify(res)}`);
            this.logger.verbose(`---`);
            throw new NotFoundException();
        }
        //
    }

}
