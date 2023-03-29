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
exports.ActivityRepository = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("typeorm");
const activity_entity_1 = require("./entities/activity.entity");
let ActivityRepository = class ActivityRepository extends typeorm_1.Repository {
    constructor() {
        super();
        this.logger = new common_1.Logger('ActivityRepository');
        this.logger.verbose('--- constructor ---');
    }
    async createItem(createDto, user) {
        const { title, description, status, priority, category, startDate, startTime, lengthTotal, lengthAction, place, sources, averagePace, shoes, assigneeID, note, } = createDto;
        const activity = new activity_entity_1.Activity();
        activity.title = title;
        activity.description = description;
        activity.status = status;
        activity.priority = priority;
        activity.category = category;
        activity.assigneeID = assigneeID;
        activity.startDate = startDate;
        activity.startTime = startTime;
        activity.lengthTotal = lengthTotal;
        activity.lengthAction = lengthAction;
        activity.place = place;
        activity.sources = sources;
        activity.averagePace = averagePace;
        activity.shoes = shoes;
        activity.note = note;
        activity.user = user;
        try {
            this.logger.verbose(`createItem -> try-catch -> activity: ${JSON.stringify(activity)}`);
            this.logger.verbose(`---`);
            return await this.save(activity);
        }
        catch (error) {
            this.logger.error(`createItem -> ERROR: ${JSON.stringify(error)}`);
            this.logger.verbose(`---`);
            throw new common_1.InternalServerErrorException();
        }
    }
    async getItemCount(user) {
        const query = this.createQueryBuilder('activity');
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
        const query = this.createQueryBuilder('activity');
        query.where({ user });
        if (status) {
            console.log(`GetItems.status: ${JSON.stringify(status)}`);
            query.andWhere('activity.status = :status', { status });
        }
        if (priority) {
            console.log(`GetItems.priority: ${JSON.stringify(priority)}`);
            query.andWhere('activity.priority = :priority', { priority });
        }
        if (search) {
            query.andWhere('(LOWER(activity.title) LIKE LOWER(:search) OR ' +
                'LOWER(activity.description) LIKE LOWER(:search) OR ' +
                'LOWER(activity.category) LIKE LOWER(:search) OR ' +
                'LOWER(activity.place) LIKE LOWER(:search) OR ' +
                'LOWER(activity.sources) LIKE LOWER(:search) OR ' +
                'LOWER(activity.shoes) LIKE LOWER(:search) OR ' +
                'LOWER(activity.note) LIKE LOWER(:search))', { search: `%${search}%` });
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
            throw new common_1.NotFoundException(`Activity with ID ${id} not found`);
        }
        return found;
    }
    async updateItem(id, updateDto, user) {
        var activity;
        const { title, description, status, priority, category, startDate, startTime, lengthTotal, lengthAction, place, sources, averagePace, shoes, assigneeID, note, } = updateDto;
        try {
            this.logger.verbose(`updateItem->try-catch->id: ${JSON.stringify(id)}`);
            this.logger.verbose(`updateItem->try-catch->updateDto: ${JSON.stringify(updateDto)}`);
            this.logger.verbose(`---`);
            activity = await this.findOne({ where: { id, user } });
        }
        catch (error) {
            this.logger.error(`updateItem -> getItem -> ERROR: ${JSON.stringify(error)}`);
            this.logger.verbose(`---`);
            throw new common_1.InternalServerErrorException(error);
        }
        if (!activity) {
            this.logger.error(`updateItem -> getItem -> Item not found - id: ${id}`);
            this.logger.verbose(`---`);
            throw new common_1.NotFoundException(`Activity with ID ${id} not found`);
        }
        activity.id = id;
        if (title !== undefined) {
            activity.title = title;
        }
        if (description !== undefined) {
            activity.description = description;
        }
        if (status !== undefined) {
            activity.status = status;
        }
        if (priority !== undefined) {
            activity.priority = priority;
        }
        if (category !== undefined) {
            activity.category = category;
        }
        if (assigneeID !== undefined) {
            activity.assigneeID = assigneeID;
        }
        if (startDate !== undefined) {
            activity.startDate = startDate;
        }
        if (startTime !== undefined) {
            activity.startTime = startTime;
        }
        if (lengthTotal !== undefined) {
            activity.lengthTotal = lengthTotal;
        }
        if (lengthAction !== undefined) {
            activity.lengthAction = lengthAction;
        }
        if (place !== undefined) {
            activity.place = place;
        }
        if (sources !== undefined) {
            activity.sources = sources;
        }
        if (averagePace !== undefined) {
            activity.averagePace = averagePace;
        }
        if (shoes !== undefined) {
            activity.shoes = shoes;
        }
        if (note !== undefined) {
            activity.note = note;
        }
        activity.user = user;
        this.logger.verbose(`updateItem->activity->before save: ${JSON.stringify(activity)}`);
        this.logger.verbose(`---`);
        try {
            this.logger.verbose(`updateItem->try-catch->activity->before save: ${JSON.stringify(activity)}`);
            this.logger.verbose(`---`);
            await this.save(activity);
            this.logger.verbose(`updateItem succesfully saved...`);
            this.logger.verbose(`---`);
            return activity;
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
ActivityRepository = __decorate([
    (0, typeorm_1.EntityRepository)(activity_entity_1.Activity),
    __metadata("design:paramtypes", [])
], ActivityRepository);
exports.ActivityRepository = ActivityRepository;
//# sourceMappingURL=activity.repository.js.map