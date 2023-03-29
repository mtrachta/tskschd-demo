import { User } from "../auth/entities/auth.entity";
import { Repository } from "typeorm";
import { CreateEvntDto } from "./dto/create-evnt.dto";
import { GetEvntFilterDto } from "./dto/get-evnt-filter.dto";
import { UpdateEvntDto } from "./dto/update-evnt.dto";
import { Evnt } from "./entities/evnt.entity";
export declare class EvntRepository extends Repository<Evnt> {
    private result;
    private logger;
    constructor();
    createItem(createDto: CreateEvntDto, user: User): Promise<Evnt>;
    getItemCount(user: User): Promise<Number>;
    getItems(filterDto: GetEvntFilterDto, user: User): Promise<Evnt[]>;
    getItem(id: string, user: User): Promise<Evnt>;
    updateItem(id: string, updateDto: UpdateEvntDto, user: User): Promise<Evnt>;
    deleteItem(id: string, user: User): Promise<void>;
}
