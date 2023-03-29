import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, Logger, Query } from '@nestjs/common';
import { NoteService } from './note.service';
import { CreateNoteDto } from './dto/create-note.dto';
import { UpdateNoteDto } from './dto/update-note.dto';
import { AuthGuard } from '@nestjs/passport';
import { User } from 'src/auth/entities/auth.entity';
import { GetUser } from 'src/_helper/get-user.decorator';
import { Note } from './entities/note.entity';
import { GetNoteFilterDto } from './dto/get-note-filter.dto';

@Controller('note')
@UseGuards(AuthGuard())
export class NoteController {
  //
  // logger
  private logger = new Logger('NoteController');

  // constructor
  constructor(
    private readonly srv: NoteService
  ) {
    this.logger.verbose('--- constructor ---');
  }

  @Post()
  createItem(
    @Body() createDto: CreateNoteDto,
    @GetUser() user: User,
  ): Promise<Note> {
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
    @Query() filterDto: GetNoteFilterDto,
    @GetUser() user: User,
  ): Promise<Note[]> {
    this.logger.verbose(`getItems->filterDto: ${JSON.stringify(filterDto)}`);
    this.logger.verbose(`---`);
    return this.srv.getItems(filterDto, user);
  }

  @Get('/:id')
  getItem(
    @Param('id') id: string,
    @GetUser() user: User
  ): Promise<Note> {
    this.logger.verbose(`getItem->id: ${JSON.stringify(id)}`);
    this.logger.verbose(`---`);
    return this.srv.getItem(id, user);
  }

  @Patch('/:id')
  updateItem(
    @Param('id') id: string,
    @Body() updateDto: UpdateNoteDto,
    @GetUser() user: User,
  ): Promise<Note> {
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
