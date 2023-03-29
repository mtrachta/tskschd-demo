import { Module } from '@nestjs/common';
import { ContactService } from './contact.service';
import { AuthModule } from '../auth/auth.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ContactRepository } from './contact.repository';
import { ContactController } from './contact.controller';

@Module({
  imports: [
    TypeOrmModule.forFeature([ ContactRepository ]),
    AuthModule,
  ],
  controllers: [ContactController],
  providers: [ContactService]
})
export class ContactModule {}
