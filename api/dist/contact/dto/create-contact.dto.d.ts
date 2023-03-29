import { ContactStatus } from '../enum/contact-status.enum';
import { ContactTitle } from '../enum/contact-title.enum';
export declare class CreateContactDto {
    title: ContactTitle;
    firstname: string;
    lastname: string;
    email: string;
    phone: string;
    position: string;
    organisation: string;
    status: ContactStatus;
    category: string;
    parentID: string;
    note: string;
}
