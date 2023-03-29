import { IsEnum, IsOptional, IsString, IsUUID } from 'class-validator';
import { ContactStatus } from '../enum/contact-status.enum';
import { ContactTitle } from '../enum/contact-title.enum';

export class GetContactFilterDto {

  @IsOptional()
  @IsEnum(ContactTitle)
  title?: ContactTitle;

  @IsOptional()
  @IsEnum(ContactStatus)
  status?: ContactStatus;

  @IsOptional()
  @IsString()
  search?: string;
}