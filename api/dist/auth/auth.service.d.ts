import { JwtService } from '@nestjs/jwt';
import { AuthRepository } from './auth.repository';
import { SigninAuthDto } from './dto/signin-auth.dto';
import { SignupAuthDto } from './dto/signup-auth.dto';
export declare class AuthService {
    private readonly rep;
    private srv;
    private logger;
    constructor(rep: AuthRepository, srv: JwtService);
    signup(signupDto: SignupAuthDto): Promise<void>;
    signin(signinDto: SigninAuthDto): Promise<{
        accessToken: string;
    }>;
}
