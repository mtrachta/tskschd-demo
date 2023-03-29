import { ConflictException, InternalServerErrorException, Logger, NotFoundException } from "@nestjs/common";
import { User } from "../auth/entities/auth.entity";
import { Connection, EntityRepository, Repository } from "typeorm";
import { CreateContactDto } from "./dto/create-contact.dto";
import { GetContactFilterDto } from "./dto/get-contact-filter.dto";
import { UpdateContactDto } from "./dto/update-contact.dto";
import { Contact } from "./entities/contact.entity";

@EntityRepository(Contact)
export class ContactRepository extends Repository<Contact> {

    private result!: any;

    // logger
    private logger = new Logger('ContactRepository');

    // constructor
    constructor() {
        super();
        this.logger.verbose('--- constructor ---');
    }


    async createItem(
        createDto: CreateContactDto,
        user: User
    ): Promise<Contact> {

        const { title, firstname, lastname, email, phone, position, organisation, status, category, parentID, note } = createDto;

        const contact: Contact = new Contact();
        contact.title = title;
        contact.firstname = firstname;
        contact.lastname = lastname;
        contact.email = email;
        contact.phone = phone;
        contact.position = position;
        contact.organisation = organisation;
        contact.status = status;
        contact.category = category;
        contact.parentID = parentID;
        contact.note = note;

        contact.user = user;
        //
        try {
            this.logger.verbose(`createItem -> try-catch -> contact: ${JSON.stringify(contact)}`);
            this.logger.verbose(`---`);
            return await this.save(contact);
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
        filterDto: GetContactFilterDto,
        user: User
    ): Promise<Contact[]> {
        //
        const { status, search } = filterDto;
        const query = this.createQueryBuilder('contact');
        query.where({ user });

        if (status) {
            console.log(`GetItems.status: ${JSON.stringify(status)}`);
            query.andWhere('contact.status = :status', { status });
        }

        if (search) {
            query.andWhere(
                '(LOWER(contact.firstname) LIKE LOWER(:search) OR ' +
                '(LOWER(contact.lastname) LIKE LOWER(:search) OR ' +
                'LOWER(contact.description) LIKE LOWER(:search) OR ' +
                'LOWER(contact.category) LIKE LOWER(:search) OR ' +
                'LOWER(contact.note) LIKE LOWER(:search))',
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
    ): Promise<Contact> {
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
            throw new NotFoundException(`Contact with ID ${id} not found`);
        }
        return found;
        //
    }

    async updateItem(
        id: string,
        updateDto: UpdateContactDto,
        user: User
    ): Promise<Contact> {
        //
        var contact!: any;
        //
        const { title, firstname, lastname, email, phone, position, organisation, status, category, parentID, note } = updateDto;

        try {
            this.logger.verbose(`updateItem->try-catch->id: ${JSON.stringify(id)}`);
            this.logger.verbose(`updateItem->try-catch->updateDto: ${JSON.stringify(updateDto)}`);
            this.logger.verbose(`---`);
                contact = await this.findOne({ where: { id, user } });
        } catch (error) {
            this.logger.error(`updateItem -> getItem -> ERROR: ${JSON.stringify(error)}`);
            this.logger.verbose(`---`);
            throw new InternalServerErrorException(error);
        }
        if (!contact) {
            this.logger.error(`updateItem -> getItem -> Item not found - id: ${id}`);
            this.logger.verbose(`---`);
            throw new NotFoundException(`Contact with ID ${id} not found`);
        }
        //
        contact.id = id;
        //
        if (title !== undefined) { contact.title = title; }
        if (firstname !== undefined) { contact.firstname = firstname; }
        if (lastname !== undefined) { contact.lastname = lastname; }
        if (email !== undefined) { contact.email = email; }
        if (phone !== undefined) { contact.organisation = phone; }
        if (position !== undefined) { contact.position = position; }
        if (organisation !== undefined) { contact.organisation = organisation; }
        if (status !== undefined) { contact.status = status; }
        if (category !== undefined) { contact.category = category; }
        if (parentID !== undefined) { contact.parentID = parentID; }
        if (note !== undefined) { contact.note = note; }

        contact.user = user;

        this.logger.verbose(`updateItem->contact->before save: ${JSON.stringify(contact)}`);
        this.logger.verbose(`---`);

        try {
            this.logger.verbose(`updateItem->try-catch->contact->before save: ${JSON.stringify(contact)}`);
            this.logger.verbose(`---`);
            await this.save(contact);

            this.logger.verbose(`updateItem succesfully saved...`);
            this.logger.verbose(`---`);
            return contact;
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
