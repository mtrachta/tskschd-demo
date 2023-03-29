import { User } from '../auth/entities/auth.entity';
import { EvntRepository } from './evnt.repository';
import { CreateEvntDto } from './dto/create-evnt.dto';
import { GetEvntFilterDto } from './dto/get-evnt-filter.dto';
import { UpdateEvntDto } from './dto/update-evnt.dto';
import { Evnt } from './entities/evnt.entity';
export declare class EvntService {
    private rep;
    private logger;
    constructor(rep: EvntRepository);
    getItemCount(user: User): Promise<Number>;
    createItem(createDto: CreateEvntDto, user: User): Promise<Evnt>;
    getItems(filterDto: GetEvntFilterDto, user: User): Promise<Evnt[]>;
    getItem(id: string, user: User): Promise<Evnt>;
    updateItem(id: string, updateDto: UpdateEvntDto, user: User): Promise<Evnt>;
    deleteItem(id: string, user: User): Promise<void>;
}
