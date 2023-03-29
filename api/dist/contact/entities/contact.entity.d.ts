import { User } from '../../auth/entities/auth.entity';
import { ContactStatus } from '../enum/contact-status.enum';
import { ContactTitle } from '../enum/contact-title.enum';
export declare class Contact {
    id: string;
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
    created: string;
    updated: string;
    user: User;
}
