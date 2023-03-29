import { Injectable, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from '../auth/entities/auth.entity';
import { NoteRepository } from './note.repository';
import { CreateNoteDto } from './dto/create-note.dto';
import { GetNoteFilterDto } from './dto/get-note-filter.dto';
import { UpdateNoteDto } from './dto/update-note.dto';
import { Note } from './entities/note.entity';

@Injectable()
export class NoteService {

  // logger
  private logger = new Logger('NoteService');

  constructor(
    @InjectRepository(NoteRepository)
    private rep: NoteRepository,
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
    createDto: CreateNoteDto,
    user: User
  ): Promise<Note> {
    this.logger.verbose(`createItem->createDto: ${JSON.stringify(createDto)}`);
    this.logger.verbose(`---`);
    return this.rep.createItem(createDto, user);
  }

  async getItems(
    filterDto: GetNoteFilterDto,
    user: User
  ): Promise<Note[]> {
    this.logger.verbose(`getItems->filterDto: ${JSON.stringify(filterDto)}`);
    this.logger.verbose(`---`);
    return this.rep.getItems(filterDto, user);
    }

  async getItem(
    id: string,
    user: User
  ): Promise<Note> {
    this.logger.verbose(`getItem->id: ${JSON.stringify(id)}`);
    this.logger.verbose(`---`);
    return this.rep.getItem(id, user);
  }

  async updateItem(
    id: string,
    updateDto: UpdateNoteDto,
    user: User
  ): Promise<Note> {
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
