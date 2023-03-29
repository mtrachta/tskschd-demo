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
exports.ContactRepository = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("typeorm");
const contact_entity_1 = require("./entities/contact.entity");
let ContactRepository = class ContactRepository extends typeorm_1.Repository {
    constructor() {
        super();
        this.logger = new common_1.Logger('ContactRepository');
        this.logger.verbose('--- constructor ---');
    }
    async createItem(createDto, user) {
        const { title, firstname, lastname, email, phone, position, organisation, status, category, parentID, note } = createDto;
        const contact = new contact_entity_1.Contact();
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
        try {
            this.logger.verbose(`createItem -> try-catch -> contact: ${JSON.stringify(contact)}`);
            this.logger.verbose(`---`);
            return await this.save(contact);
        }
        catch (error) {
            this.logger.error(`createItem -> ERROR: ${JSON.stringify(error)}`);
            this.logger.verbose(`---`);
            throw new common_1.InternalServerErrorException();
        }
    }
    async getItemCount(user) {
        const query = this.createQueryBuilder('task');
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
        const { status, search } = filterDto;
        const query = this.createQueryBuilder('contact');
        query.where({ user });
        if (status) {
            console.log(`GetItems.status: ${JSON.stringify(status)}`);
            query.andWhere('contact.status = :status', { status });
        }
        if (search) {
            query.andWhere('(LOWER(contact.firstname) LIKE LOWER(:search) OR ' +
                '(LOWER(contact.lastname) LIKE LOWER(:search) OR ' +
                'LOWER(contact.description) LIKE LOWER(:search) OR ' +
                'LOWER(contact.category) LIKE LOWER(:search) OR ' +
                'LOWER(contact.note) LIKE LOWER(:search))', { search: `%${search}%` });
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
            throw new common_1.NotFoundException(`Contact with ID ${id} not found`);
        }
        return found;
    }
    async updateItem(id, updateDto, user) {
        var contact;
        const { title, firstname, lastname, email, phone, position, organisation, status, category, parentID, note } = updateDto;
        try {
            this.logger.verbose(`updateItem->try-catch->id: ${JSON.stringify(id)}`);
            this.logger.verbose(`updateItem->try-catch->updateDto: ${JSON.stringify(updateDto)}`);
            this.logger.verbose(`---`);
            contact = await this.findOne({ where: { id, user } });
        }
        catch (error) {
            this.logger.error(`updateItem -> getItem -> ERROR: ${JSON.stringify(error)}`);
            this.logger.verbose(`---`);
            throw new common_1.InternalServerErrorException(error);
        }
        if (!contact) {
            this.logger.error(`updateItem -> getItem -> Item not found - id: ${id}`);
            this.logger.verbose(`---`);
            throw new common_1.NotFoundException(`Contact with ID ${id} not found`);
        }
        contact.id = id;
        if (title !== undefined) {
            contact.title = title;
        }
        if (firstname !== undefined) {
            contact.firstname = firstname;
        }
        if (lastname !== undefined) {
            contact.lastname = lastname;
        }
        if (email !== undefined) {
            contact.email = email;
        }
        if (phone !== undefined) {
            contact.organisation = phone;
        }
        if (position !== undefined) {
            contact.position = position;
        }
        if (organisation !== undefined) {
            contact.organisation = organisation;
        }
        if (status !== undefined) {
            contact.status = status;
        }
        if (category !== undefined) {
            contact.category = category;
        }
        if (parentID !== undefined) {
            contact.parentID = parentID;
        }
        if (note !== undefined) {
            contact.note = note;
        }
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
ContactRepository = __decorate([
    (0, typeorm_1.EntityRepository)(contact_entity_1.Contact),
    __metadata("design:paramtypes", [])
], ContactRepository);
exports.ContactRepository = ContactRepository;
//# sourceMappingURL=contact.repository.js.map