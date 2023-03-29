import { ConflictException, InternalServerErrorException, Logger, NotFoundException } from "@nestjs/common";
import { User } from "../auth/entities/auth.entity";
import { Connection, EntityRepository, Repository } from "typeorm";
import { CreateTaskDto } from "./dto/create-task.dto";
import { GetTaskFilterDto } from "./dto/get-task-filter.dto";
import { UpdateTaskDto } from "./dto/update-task.dto";
import { Task } from "./entities/task.entity";

@EntityRepository(Task)
export class TaskRepository extends Repository<Task> {

    private result!: any;

    // logger
    private logger = new Logger('TaskRepository');

    // constructor
    constructor() {
        super();
        this.logger.verbose('--- constructor ---');
    }


    async createItem(
        createDto: CreateTaskDto,
        user: User
    ): Promise<Task> {

        const { title, description, status, priority, category, assigneeID, note, start, finish } = createDto;

        const task: Task = new Task();
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
        //
        try {
            this.logger.verbose(`createItem -> try-catch -> task: ${JSON.stringify(task)}`);
            this.logger.verbose(`---`);
            return await this.save(task);
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
        filterDto: GetTaskFilterDto,
        // clmName: string,
        // orderType: string,
        user: User
    ): Promise<Task[]> {
        //
        // const ASC = '"' + orderType + '"';
        const { status, priority, search } = filterDto;
        const query = this.createQueryBuilder('task');
        // query.orderBy(clmName, 'ASC');
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
            query.andWhere(
                '(LOWER(task.title) LIKE LOWER(:search) OR ' +
                'LOWER(task.description) LIKE LOWER(:search) OR ' +
                'LOWER(task.category) LIKE LOWER(:search) OR ' +
                'LOWER(task.note) LIKE LOWER(:search))',
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
    ): Promise<Task> {
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
            throw new NotFoundException(`Task with ID ${id} not found`);
        }
        return found;
        //
    }

    async updateItem(
        id: string,
        updateDto: UpdateTaskDto,
        user: User
    ): Promise<Task> {
        //
        var task!: any;
        //
        const { title, description, status, priority, category, assigneeID, note, start, finish } = updateDto;

        try {
            this.logger.verbose(`updateItem->try-catch->id: ${JSON.stringify(id)}`);
            this.logger.verbose(`updateItem->try-catch->updateDto: ${JSON.stringify(updateDto)}`);
            this.logger.verbose(`---`);
                task = await this.findOne({ where: { id, user } });
        } catch (error) {
            this.logger.error(`updateItem -> getItem -> ERROR: ${JSON.stringify(error)}`);
            this.logger.verbose(`---`);
            throw new InternalServerErrorException(error);
        }
        if (!task) {
            this.logger.error(`updateItem -> getItem -> Item not found - id: ${id}`);
            this.logger.verbose(`---`);
            throw new NotFoundException(`Task with ID ${id} not found`);
        }
        //
        task.id = id;
        //
        if (title !== undefined) { task.title = title; }
        if (description !== undefined) { task.description = description; }
        if (status !== undefined) { task.status = status; }
        if (priority !== undefined) { task.priority = priority; }
        if (category !== undefined) { task.category = category; }
        if (assigneeID !== undefined) { task.assigneeID = assigneeID; }
        if (start !== undefined) { task.start = start; }
        if (finish !== undefined) { task.finish = finish; }
        if (note !== undefined) { task.note = note; }

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
