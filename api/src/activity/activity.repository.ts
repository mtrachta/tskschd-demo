import { ConflictException, InternalServerErrorException, Logger, NotFoundException } from "@nestjs/common";
import { User } from "../auth/entities/auth.entity";
import { Connection, EntityRepository, Repository } from "typeorm";
import { CreateActivityDto } from "./dto/create-activity.dto";
import { GetActivityFilterDto } from "./dto/get-activity-filter.dto";
import { UpdateActivityDto } from "./dto/update-activity.dto";
import { Activity } from "./entities/activity.entity";

@EntityRepository(Activity)
export class ActivityRepository extends Repository<Activity> {

    private result!: any;

    // logger
    private logger = new Logger('ActivityRepository');

    // constructor
    constructor() {
        super();
        this.logger.verbose('--- constructor ---');
    }


    async createItem(
        createDto: CreateActivityDto,
        user: User
    ): Promise<Activity> {

        const {
            title,
            description,
            status,
            priority,
            category,
            startDate,
            startTime,
            lengthTotal,
            lengthAction,
            place,
            sources,
            averagePace,
            shoes,
            assigneeID,
            note,
         } = createDto;

        const activity: Activity = new Activity();
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
        //
        try {
            this.logger.verbose(`createItem -> try-catch -> activity: ${JSON.stringify(activity)}`);
            this.logger.verbose(`---`);
            return await this.save(activity);
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

        const query = this.createQueryBuilder('activity');
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
        filterDto: GetActivityFilterDto,
        user: User
    ): Promise<Activity[]> {
        //
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
            query.andWhere(
                '(LOWER(activity.title) LIKE LOWER(:search) OR ' +
                'LOWER(activity.description) LIKE LOWER(:search) OR ' +
                'LOWER(activity.category) LIKE LOWER(:search) OR ' +
                'LOWER(activity.place) LIKE LOWER(:search) OR ' +
                'LOWER(activity.sources) LIKE LOWER(:search) OR ' +
                'LOWER(activity.shoes) LIKE LOWER(:search) OR ' +
                'LOWER(activity.note) LIKE LOWER(:search))',
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
    ): Promise<Activity> {
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
            throw new NotFoundException(`Activity with ID ${id} not found`);
        }
        return found;
        //
    }

    async updateItem(
        id: string,
        updateDto: UpdateActivityDto,
        user: User
    ): Promise<Activity> {
        //
        var activity!: any;
        //
        const {
            title,
            description,
            status,
            priority,
            category,
            startDate,
            startTime,
            lengthTotal,
            lengthAction,
            place,
            sources,
            averagePace,
            shoes,
            assigneeID,
            note,
         } = updateDto;

        try {
            this.logger.verbose(`updateItem->try-catch->id: ${JSON.stringify(id)}`);
            this.logger.verbose(`updateItem->try-catch->updateDto: ${JSON.stringify(updateDto)}`);
            this.logger.verbose(`---`);
                activity = await this.findOne({ where: { id, user } });
        } catch (error) {
            this.logger.error(`updateItem -> getItem -> ERROR: ${JSON.stringify(error)}`);
            this.logger.verbose(`---`);
            throw new InternalServerErrorException(error);
        }
        if (!activity) {
            this.logger.error(`updateItem -> getItem -> Item not found - id: ${id}`);
            this.logger.verbose(`---`);
            throw new NotFoundException(`Activity with ID ${id} not found`);
        }
        //
        activity.id = id;
        //
        if (title !== undefined) { activity.title = title; }
        if (description !== undefined) { activity.description = description; }
        if (status !== undefined) { activity.status = status; }
        if (priority !== undefined) { activity.priority = priority; }
        if (category !== undefined) { activity.category = category; }
        if (assigneeID !== undefined) { activity.assigneeID = assigneeID; }
        if (startDate !== undefined) { activity.startDate = startDate; }
        if (startTime !== undefined) { activity.startTime = startTime; }
        if (lengthTotal !== undefined) { activity.lengthTotal = lengthTotal; }
        if (lengthAction !== undefined) { activity.lengthAction = lengthAction; }
        if (place !== undefined) { activity.place = place; }
        if (sources !== undefined) { activity.sources = sources; }
        if (averagePace !== undefined) { activity.averagePace = averagePace; }
        if (shoes !== undefined) { activity.shoes = shoes; }

        if (note !== undefined) { activity.note = note; }

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
