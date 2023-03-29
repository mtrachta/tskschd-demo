import { ConflictException, InternalServerErrorException, Logger } from "@nestjs/common";
import { EntityRepository, Repository } from "typeorm";
import { SigninAuthDto } from "./dto/signin-auth.dto";
import { SignupAuthDto } from "./dto/signup-auth.dto";
import { User } from "./entities/auth.entity";

import * as bcrypt from 'bcrypt';

@EntityRepository(User)
export class AuthRepository extends Repository<User> {
    //
    private logger = new Logger('AuthRepository');
    //

    // constructor
    constructor() {
        super();
        this.logger.verbose('--- constructor ---');
    }

    // signup
    async signup(
        signupDto: SignupAuthDto
    ): Promise<void> {
        // 
        const { username, password, firstname, lastname } = signupDto;

        const salt = await bcrypt.genSalt();
        const hashedPassword = await bcrypt.hash(password, salt);

        const user = this.create({ username, password: hashedPassword, firstname, lastname });
        this.logger.verbose(`signup->user: ${JSON.stringify(user)}`);
        this.logger.verbose('---');
    
        try {
            await this.save(user);
            this.logger.verbose(`signup->saved(user): ${JSON.stringify(user)}`);
            this.logger.verbose('---');
    
        } catch (error) {
            this.logger.verbose(`signup->error: ${JSON.stringify(error)}`);
            this.logger.verbose('---');    
            if (error.code === 'ER_DUP_ENTRY') {
                // duplicate username
                throw new ConflictException('Username already exists');
            } else {
                throw new InternalServerErrorException();
            }
        }
    }


}