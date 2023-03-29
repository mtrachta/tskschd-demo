import { UserStatus } from "./auth-status.enum";

export class User {
    id!: string;
    username!: string;
    password!: string;
    firstname!: string;
    lastname!: string;
    accessToken?: string;
    // status!: UserStatus;
}