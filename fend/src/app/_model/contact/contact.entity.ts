import { ContactStatus } from "./contact-status.enum";
import { ContactTitle } from "./contact-title.enum";

export class Contact {
    //
    id!: string;
    // 
    title!: ContactTitle;
    firstname!: string;
    lastname!: string;
    // 
    email!: string;
    phone!: string;
    //
    position!: string;
    organisation!: string;
    //
    status!: ContactStatus;
    category!: string;
    //
    note!: string;
    // 
    created!: string;
    updated!: string;
    // 
    parentID!: string;
}

export interface IContact {
    items: Contact[];
    total_count: number;
}