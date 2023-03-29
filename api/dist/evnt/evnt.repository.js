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
exports.EvntRepository = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("typeorm");
const evnt_entity_1 = require("./entities/evnt.entity");
let EvntRepository = class EvntRepository extends typeorm_1.Repository {
    constructor() {
        super();
        this.logger = new common_1.Logger('EvntRepository');
        this.logger.verbose('--- constructor ---');
    }
    async createItem(createDto, user) {
        const { title, description, status, priority, category, taskID, assigneeID, note, start, finish } = createDto;
        const evnt = new evnt_entity_1.Evnt();
        evnt.title = title;
        evnt.description = description;
        evnt.status = status;
        evnt.priority = priority;
        evnt.category = category;
        evnt.assigneeID = assigneeID;
        evnt.taskID = taskID;
        evnt.start = start;
        evnt.finish = finish;
        evnt.note = note;
        evnt.user = user;
        try {
            this.logger.verbose(`createItem -> try-catch -> evnt: ${JSON.stringify(evnt)}`);
            this.logger.verbose(`---`);
            return await this.save(evnt);
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
        const query = this.createQueryBuilder('evnt');
        query.where({ user });
        if (status) {
            console.log(`GetItems.status: ${JSON.stringify(status)}`);
            query.andWhere('evnt.status = :status', { status });
        }
        if (priority) {
            console.log(`GetItems.priority: ${JSON.stringify(priority)}`);
            query.andWhere('evnt.priority = :priority', { priority });
        }
        if (search) {
            query.andWhere('(LOWER(evnt.title) LIKE LOWER(:search) OR ' +
                'LOWER(evnt.start) LIKE LOWER(:search) OR ' +
                'LOWER(evnt.category) LIKE LOWER(:search) OR ' +
                'LOWER(evnt.finish) LIKE LOWER(:search))', { search: `%${search}%` });
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
            throw new common_1.NotFoundException(`Evnt with ID ${id} not found`);
        }
        return found;
    }
    async updateItem(id, updateDto, user) {
        var evnt;
        const { title, description, status, priority, category, taskID, assigneeID, note, start, finish } = updateDto;
        try {
            this.logger.verbose(`updateItem->try-catch->id: ${JSON.stringify(id)}`);
            this.logger.verbose(`updateItem->try-catch->updateDto: ${JSON.stringify(updateDto)}`);
            this.logger.verbose(`---`);
            evnt = await this.findOne({ where: { id, user } });
        }
        catch (error) {
            this.logger.error(`updateItem -> getItem -> ERROR: ${JSON.stringify(error)}`);
            this.logger.verbose(`---`);
            throw new common_1.InternalServerErrorException(error);
        }
        if (!evnt) {
            this.logger.error(`updateItem -> getItem -> Item not found - id: ${id}`);
            this.logger.verbose(`---`);
            throw new common_1.NotFoundException(`Evnt with ID ${id} not found`);
        }
        evnt.id = id;
        if (title !== undefined) {
            evnt.title = title;
        }
        if (description !== undefined) {
            evnt.description = description;
        }
        if (status !== undefined) {
            evnt.status = status;
        }
        if (priority !== undefined) {
            evnt.priority = priority;
        }
        if (category !== undefined) {
            evnt.category = category;
        }
        if (assigneeID !== undefined) {
            evnt.assigneeID = assigneeID;
        }
        if (taskID !== undefined) {
            evnt.taskID = taskID;
        }
        if (start !== undefined) {
            evnt.start = start;
        }
        if (finish !== undefined) {
            evnt.finish = finish;
        }
        if (note !== undefined) {
            evnt.note = note;
        }
        evnt.user = user;
        this.logger.verbose(`updateItem->evnt->before save: ${JSON.stringify(evnt)}`);
        this.logger.verbose(`---`);
        try {
            this.logger.verbose(`updateItem->try-catch->evnt->before save: ${JSON.stringify(evnt)}`);
            this.logger.verbose(`---`);
            await this.save(evnt);
            this.logger.verbose(`updateItem succesfully saved...`);
            this.logger.verbose(`---`);
            return evnt;
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
EvntRepository = __decorate([
    (0, typeorm_1.EntityRepository)(evnt_entity_1.Evnt),
    __metadata("design:paramtypes", [])
], EvntRepository);
exports.EvntRepository = EvntRepository;
//# sourceMappingURL=evnt.repository.js.map