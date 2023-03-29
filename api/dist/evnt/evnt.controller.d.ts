import { EvntService } from './evnt.service';
import { CreateEvntDto } from './dto/create-evnt.dto';
import { UpdateEvntDto } from './dto/update-evnt.dto';
import { User } from 'src/auth/entities/auth.entity';
import { Evnt } from './entities/evnt.entity';
import { GetEvntFilterDto } from './dto/get-evnt-filter.dto';
export declare class EvntController {
    private readonly srv;
    private logger;
    constructor(srv: EvntService);
    createItem(createDto: CreateEvntDto, user: User): Promise<Evnt>;
    getItemCount(user: User): Promise<Number>;
    getItems(filterDto: GetEvntFilterDto, user: User): Promise<Evnt[]>;
    getItem(id: string, user: User): Promise<Evnt>;
    updateItem(id: string, updateDto: UpdateEvntDto, user: User): Promise<Evnt>;
    deleteItem(id: string, user: User): Promise<void>;
}
