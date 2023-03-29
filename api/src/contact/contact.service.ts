import { Injectable, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from '../auth/entities/auth.entity';
import { ContactRepository } from './contact.repository';
import { CreateContactDto } from './dto/create-contact.dto';
import { GetContactFilterDto } from './dto/get-contact-filter.dto';
import { UpdateContactDto } from './dto/update-contact.dto';
import { Contact } from './entities/contact.entity';

@Injectable()
export class ContactService {

  // logger
  private logger = new Logger('ContactService');

  constructor(
    @InjectRepository(ContactRepository)
    private rep: ContactRepository,
  ) {
    this.logger.verbose('--- constructor ---');
  }

  async getItemCount(
    user: User
  ): Promise<Number> {
    this.logger.verbose(`getItemCount - start`);
    this.logger.verbose(`---`);
    return this.rep.getItemCount(user);
  }

  async createItem(
    createDto: CreateContactDto,
    user: User
  ): Promise<Contact> {
    this.logger.verbose(`createItem->createDto: ${JSON.stringify(createDto)}`);
    this.logger.verbose(`---`);
    return this.rep.createItem(createDto, user);
  }

  async getItems(
    filterDto: GetContactFilterDto,
    user: User
  ): Promise<Contact[]> {
    this.logger.verbose(`getItems->filterDto: ${JSON.stringify(filterDto)}`);
    this.logger.verbose(`---`);
    return this.rep.getItems(filterDto, user);
    }

  async getItem(
    id: string,
    user: User
  ): Promise<Contact> {
    this.logger.verbose(`getItem->id: ${JSON.stringify(id)}`);
    this.logger.verbose(`---`);
    return this.rep.getItem(id, user);
  }

  async updateItem(
    id: string,
    updateDto: UpdateContactDto,
    user: User
  ): Promise<Contact> {
    this.logger.verbose(`updateItem->id: ${JSON.stringify(id)}`);
    this.logger.verbose(`updateItem->body: ${JSON.stringify(updateDto)}`);
    this.logger.verbose(`---`);
    return this.rep.updateItem(id, updateDto, user);
  }

  async deleteItem(
    id: string,
    user: User
  ): Promise<void> {
    this.logger.verbose(`deleteItem->id: ${JSON.stringify(id)}`);
    this.logger.verbose(`---`);
    return this.rep.deleteItem(id, user);
  }
  //
}
