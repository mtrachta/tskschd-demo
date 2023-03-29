import { ContactStatus } from '../enum/contact-status.enum';
import { ContactTitle } from '../enum/contact-title.enum';
export declare class GetContactFilterDto {
    title?: ContactTitle;
    status?: ContactStatus;
    search?: string;
}
