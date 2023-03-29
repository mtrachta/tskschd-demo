import { User } from '../auth/entities/auth.entity';
import { ContactRepository } from './contact.repository';
import { CreateContactDto } from './dto/create-contact.dto';
import { GetContactFilterDto } from './dto/get-contact-filter.dto';
import { UpdateContactDto } from './dto/update-contact.dto';
import { Contact } from './entities/contact.entity';
export declare class ContactService {
    private rep;
    private logger;
    constructor(rep: ContactRepository);
    getItemCount(user: User): Promise<Number>;
    createItem(createDto: CreateContactDto, user: User): Promise<Contact>;
    getItems(filterDto: GetContactFilterDto, user: User): Promise<Contact[]>;
    getItem(id: string, user: User): Promise<Contact>;
    updateItem(id: string, updateDto: UpdateContactDto, user: User): Promise<Contact>;
    deleteItem(id: string, user: User): Promise<void>;
}
