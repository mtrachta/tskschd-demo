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
exports.TaskRepository = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("typeorm");
const task_entity_1 = require("./entities/task.entity");
let TaskRepository = class TaskRepository extends typeorm_1.Repository {
    constructor() {
        super();
        this.logger = new common_1.Logger('TaskRepository');
        this.logger.verbose('--- constructor ---');
    }
    async createItem(createDto, user) {
        const { title, description, status, priority, category, assigneeID, note, start, finish } = createDto;
        const task = new task_entity_1.Task();
        task.title = title;
        task.description = description;
        task.status = status;
        task.priority = priority;
        task.category = category;
        task.assigneeID = assigneeID;
        task.start = start;
        task.finish = finish;
        task.note = note;
        task.user = user;
        try {
            this.logger.verbose(`createItem -> try-catch -> task: ${JSON.stringify(task)}`);
            this.logger.verbose(`---`);
            return await this.save(task);
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
        const query = this.createQueryBuilder('task');
        query.where({ user });
        if (status) {
            console.log(`GetItems.status: ${JSON.stringify(status)}`);
            query.andWhere('task.status = :status', { status });
        }
        if (priority) {
            console.log(`GetItems.priority: ${JSON.stringify(priority)}`);
            query.andWhere('task.priority = :priority', { priority });
        }
        if (search) {
            query.andWhere('(LOWER(task.title) LIKE LOWER(:search) OR ' +
                'LOWER(task.description) LIKE LOWER(:search) OR ' +
                'LOWER(task.category) LIKE LOWER(:search) OR ' +
                'LOWER(task.note) LIKE LOWER(:search))', { search: `%${search}%` });
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
            throw new common_1.NotFoundException(`Task with ID ${id} not found`);
        }
        return found;
    }
    async updateItem(id, updateDto, user) {
        var task;
        const { title, description, status, priority, category, assigneeID, note, start, finish } = updateDto;
        try {
            this.logger.verbose(`updateItem->try-catch->id: ${JSON.stringify(id)}`);
            this.logger.verbose(`updateItem->try-catch->updateDto: ${JSON.stringify(updateDto)}`);
            this.logger.verbose(`---`);
            task = await this.findOne({ where: { id, user } });
        }
        catch (error) {
            this.logger.error(`updateItem -> getItem -> ERROR: ${JSON.stringify(error)}`);
            this.logger.verbose(`---`);
            throw new common_1.InternalServerErrorException(error);
        }
        if (!task) {
            this.logger.error(`updateItem -> getItem -> Item not found - id: ${id}`);
            this.logger.verbose(`---`);
            throw new common_1.NotFoundException(`Task with ID ${id} not found`);
        }
        task.id = id;
        if (title !== undefined) {
            task.title = title;
        }
        if (description !== undefined) {
            task.description = description;
        }
        if (status !== undefined) {
            task.status = status;
        }
        if (priority !== undefined) {
            task.priority = priority;
        }
        if (category !== undefined) {
            task.category = category;
        }
        if (assigneeID !== undefined) {
            task.assigneeID = assigneeID;
        }
        if (start !== undefined) {
            task.start = start;
        }
        if (finish !== undefined) {
            task.finish = finish;
        }
        if (note !== undefined) {
            task.note = note;
        }
        task.user = user;
        this.logger.verbose(`updateItem->task->before save: ${JSON.stringify(task)}`);
        this.logger.verbose(`---`);
        try {
            this.logger.verbose(`updateItem->try-catch->task->before save: ${JSON.stringify(task)}`);
            this.logger.verbose(`---`);
            await this.save(task);
            this.logger.verbose(`updateItem succesfully saved...`);
            this.logger.verbose(`---`);
            return task;
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
TaskRepository = __decorate([
    (0, typeorm_1.EntityRepository)(task_entity_1.Task),
    __metadata("design:paramtypes", [])
], TaskRepository);
exports.TaskRepository = TaskRepository;
//# sourceMappingURL=task.repository.js.map