import { ContactService } from './contact.service';
import { CreateContactDto } from './dto/create-contact.dto';
import { UpdateContactDto } from './dto/update-contact.dto';
import { User } from 'src/auth/entities/auth.entity';
import { Contact } from './entities/contact.entity';
import { GetContactFilterDto } from './dto/get-contact-filter.dto';
export declare class ContactController {
    private readonly srv;
    private logger;
    constructor(srv: ContactService);
    createItem(createDto: CreateContactDto, user: User): Promise<Contact>;
    getItemCount(user: User): Promise<Number>;
    getItems(filterDto: GetContactFilterDto, user: User): Promise<Contact[]>;
    getItem(id: string, user: User): Promise<Contact>;
    updateItem(id: string, updateDto: UpdateContactDto, user: User): Promise<Contact>;
    deleteItem(id: string, user: User): Promise<void>;
}
