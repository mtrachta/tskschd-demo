import { IsNotEmpty, IsEnum, IsOptional, IsEmail, IsPhoneNumber } from 'class-validator';
import { ContactStatus } from '../enum/contact-status.enum';
import { ContactTitle } from '../enum/contact-title.enum';

export class UpdateContactDto {
    //
    @IsOptional()
    @IsEnum(ContactTitle)
    title: ContactTitle;

    @IsOptional()
    firstname: string;
    @IsNotEmpty()
    lastname: string;

    // @IsEmail()
    @IsOptional()
    email: string;

    // @IsPhoneNumber()
    @IsOptional()
    phone: string;

    @IsOptional()
    position: string;
    @IsOptional()
    organisation: string;

    @IsEnum(ContactStatus)
    status: ContactStatus;
    @IsOptional()
    category: string;

    @IsOptional()
    parentID: string;

    @IsOptional()
    note: string;
    //
}
