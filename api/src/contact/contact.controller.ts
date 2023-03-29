import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, Logger, Query } from '@nestjs/common';
import { ContactService } from './contact.service';
import { CreateContactDto } from './dto/create-contact.dto';
import { UpdateContactDto } from './dto/update-contact.dto';
import { AuthGuard } from '@nestjs/passport';
import { User } from 'src/auth/entities/auth.entity';
import { GetUser } from 'src/_helper/get-user.decorator';
import { Contact } from './entities/contact.entity';
import { GetContactFilterDto } from './dto/get-contact-filter.dto';

@Controller('contact')
@UseGuards(AuthGuard())
export class ContactController {
  //
  // logger
  private logger = new Logger('ContactController');

  // constructor
  constructor(
    private readonly srv: ContactService
  ) {
    this.logger.verbose('--- constructor ---');
  }

  @Post()
  createItem(
    @Body() createDto: CreateContactDto,
    @GetUser() user: User,
  ): Promise<Contact> {
    this.logger.verbose(`createItem->createDto: ${JSON.stringify(createDto)}`);
    this.logger.verbose(`---`);
    return this.srv.createItem(createDto, user);
  }

  @Get('/count')
  getItemCount(
    @GetUser() user: User
  ): Promise<Number> {
    this.logger.verbose(`getItemCount - start`);
    this.logger.verbose(`---`);
    return this.srv.getItemCount(user);
  }

  @Get()
  getItems(
    @Query() filterDto: GetContactFilterDto,
    @GetUser() user: User,
  ): Promise<Contact[]> {
    this.logger.verbose(`getItems->filterDto: ${JSON.stringify(filterDto)}`);
    this.logger.verbose(`---`);
    return this.srv.getItems(filterDto, user);
  }

  @Get('/:id')
  getItem(
    @Param('id') id: string,
    @GetUser() user: User
  ): Promise<Contact> {
    this.logger.verbose(`getItem->id: ${JSON.stringify(id)}`);
    this.logger.verbose(`---`);
    return this.srv.getItem(id, user);
  }

  @Patch('/:id')
  updateItem(
    @Param('id') id: string,
    @Body() updateDto: UpdateContactDto,
    @GetUser() user: User,
  ): Promise<Contact> {
    this.logger.verbose(`updateItem->id: ${JSON.stringify(id)}`);
    this.logger.verbose(`updateItem->body: ${JSON.stringify(updateDto)}`);
    this.logger.verbose(`---`);
    return this.srv.updateItem(id, updateDto, user);
  }

  @Delete('/:id')
  deleteItem(
    @Param('id') id: string,
    @GetUser() user: User
  ): Promise<void> {
    this.logger.verbose(`deleteItem->id: ${JSON.stringify(id)}`);
    this.logger.verbose(`---`);
    return this.srv.deleteItem(id, user);
  }
  //
}
