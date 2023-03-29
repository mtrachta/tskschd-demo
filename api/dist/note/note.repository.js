"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.NoteRepository = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("typeorm");
const note_entity_1 = require("./entities/note.entity");
let NoteRepository = class NoteRepository extends typeorm_1.Repository {
    constructor() {
        super();
        this.logger = new common_1.Logger('NoteRepository');
        this.logger.verbose('--- constructor ---');
    }
    async createItem(createDto, user) {
        const { title, body, status, priority, category, taskID } = createDto;
        const note = new note_entity_1.Note();
        note.title = title;
        note.body = body;
        note.status = status;
        note.priority = priority;
        note.category = category;
        note.taskID = taskID;
        note.user = user;
        try {
            this.logger.verbose(`createItem -> try-catch -> note: ${JSON.stringify(note)}`);
            this.logger.verbose(`---`);
            return await this.save(note);
        }
        catch (error) {
            this.logger.error(`createItem -> ERROR: ${JSON.stringify(error)}`);
            this.logger.verbose(`---`);
            throw new common_1.InternalServerErrorException();
        }
    }
    async getItemCount(user) {
        const query = this.createQueryBuilder('task');
        query.where({ user });
        try {
            this.logger.verbose(`getItemCount -> try-catch starts`);
            this.logger.verbose(`---`);
            return await query.getCount();
        }
        catch (error) {
            this.logger.error(`getItemCount -> ERROR: ${JSON.stringify(error)}`);
            this.logger.verbose(`---`);
            throw new common_1.InternalServerErrorException();
        }
    }
    async getItems(filterDto, user) {
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
            query.andWhere('(LOWER(note.title) LIKE LOWER(:search) OR ' +
                'LOWER(note.body) LIKE LOWER(:search) OR ' +
                'LOWER(note.category) LIKE LOWER(:search) OR ' +
                'LOWER(note.note) LIKE LOWER(:search))', { search: `%${search}%` });
        }
        try {
            this.logger.verbose(`getItems -> try-catch -> filterDto: ${JSON.stringify(filterDto)}`);
            this.logger.verbose(`---`);
            return await query.getMany();
        }
        catch (error) {
            this.logger.error(`getItems -> ERROR: ${JSON.stringify(error)}`);
            this.logger.verbose(`---`);
            throw new common_1.InternalServerErrorException();
        }
    }
    async getItem(id, user) {
        var found;
        try {
            this.logger.verbose(`getItem -> try-catch -> id: ${JSON.stringify(id)}`);
            this.logger.verbose(`---`);
            found = await this.findOne({ where: { id, user } });
        }
        catch (error) {
            this.logger.error(`getItems -> ERROR: ${JSON.stringify(error)}`);
            this.logger.verbose(`---`);
            throw new common_1.InternalServerErrorException(error);
        }
        if (!found) {
            this.logger.error(`getItem -> Item not found - id: ${id}`);
            this.logger.verbose(`---`);
            throw new common_1.NotFoundException(`Note with ID ${id} not found`);
        }
        this.logger.verbose(`getItem -> found : ${JSON.stringify(found)}`);
        this.logger.verbose(`---`);
        return found;
    }
    async updateItem(id, updateDto, user) {
        var note;
        const { title, body, status, priority, category, taskID } = updateDto;
        try {
            this.logger.verbose(`updateItem->try-catch->id: ${JSON.stringify(id)}`);
            this.logger.verbose(`updateItem->try-catch->updateDto: ${JSON.stringify(updateDto)}`);
            this.logger.verbose(`---`);
            note = await this.findOne({ where: { id, user } });
        }
        catch (error) {
            this.logger.error(`updateItem -> getItem -> ERROR: ${JSON.stringify(error)}`);
            this.logger.verbose(`---`);
            throw new common_1.InternalServerErrorException(error);
        }
        if (!note) {
            this.logger.error(`updateItem -> getItem -> Item not found - id: ${id}`);
            this.logger.verbose(`---`);
            throw new common_1.NotFoundException(`Note with ID ${id} not found`);
        }
        note.id = id;
        if (title !== undefined) {
            note.title = title;
        }
        if (body !== undefined) {
            note.body = body;
        }
        if (status !== undefined) {
            note.status = status;
        }
        if (priority !== undefined) {
            note.priority = priority;
        }
        if (category !== undefined) {
            note.category = category;
        }
        if (taskID !== undefined) {
            note.taskID = taskID;
        }
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
        }
        catch (error) {
            this.logger.error(`updateItem UNSUCCESFULLY finished -> ERROR: ${JSON.stringify(error)}`);
            this.logger.verbose(`---`);
            throw new common_1.InternalServerErrorException();
        }
    }
    async deleteItem(id, user) {
        var res;
        try {
            this.logger.verbose(`deleteItem -> try-catch -> id: ${JSON.stringify(id)}`);
            this.logger.verbose(`---`);
            res = await this.delete({ id, user });
        }
        catch (error) {
            this.logger.error(`deleteItem -> ERROR: ${JSON.stringify(error)}`);
            this.logger.verbose(`---`);
            throw new common_1.InternalServerErrorException(error);
        }
        if (res.affected === 0) {
            this.logger.error(`deleteItem -> not found ERROR: ${JSON.stringify(res)}`);
            this.logger.verbose(`---`);
            throw new common_1.NotFoundException();
        }
    }
};
NoteRepository = __decorate([
    (0, typeorm_1.EntityRepository)(note_entity_1.Note),
    __metadata("design:paramtypes", [])
], NoteRepository);
exports.NoteRepository = NoteRepository;
//# sourceMappingURL=note.repository.js.map