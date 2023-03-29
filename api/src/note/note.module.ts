import { Module } from '@nestjs/common';
import { NoteService } from './note.service';
import { AuthModule } from '../auth/auth.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { NoteController } from './note.controller';
import { NoteRepository } from './note.repository';

@Module({
  imports: [
    TypeOrmModule.forFeature([ NoteRepository ]),
    AuthModule,
  ],
  controllers: [NoteController],
  providers: [NoteService]
})
export class NoteModule {}
