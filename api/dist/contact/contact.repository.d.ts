import { User } from "../auth/entities/auth.entity";
import { Repository } from "typeorm";
import { CreateContactDto } from "./dto/create-contact.dto";
import { GetContactFilterDto } from "./dto/get-contact-filter.dto";
import { UpdateContactDto } from "./dto/update-contact.dto";
import { Contact } from "./entities/contact.entity";
export declare class ContactRepository extends Repository<Contact> {
    private result;
    private logger;
    constructor();
    createItem(createDto: CreateContactDto, user: User): Promise<Contact>;
    getItemCount(user: User): Promise<Number>;
    getItems(filterDto: GetContactFilterDto, user: User): Promise<Contact[]>;
    getItem(id: string, user: User): Promise<Contact>;
    updateItem(id: string, updateDto: UpdateContactDto, user: User): Promise<Contact>;
    deleteItem(id: string, user: User): Promise<void>;
}
