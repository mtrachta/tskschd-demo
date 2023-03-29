import { Repository } from "typeorm";
import { SignupAuthDto } from "./dto/signup-auth.dto";
import { User } from "./entities/auth.entity";
export declare class AuthRepository extends Repository<User> {
    private logger;
    constructor();
    signup(signupDto: SignupAuthDto): Promise<void>;
}
