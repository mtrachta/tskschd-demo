import { AuthService } from './auth.service';
import { SigninAuthDto } from './dto/signin-auth.dto';
import { SignupAuthDto } from './dto/signup-auth.dto';
export declare class AuthController {
    private readonly srv;
    private logger;
    constructor(srv: AuthService);
    signup(signupDto: SignupAuthDto): Promise<void>;
    signin(signinDto: SigninAuthDto): Promise<{
        accessToken: string;
    }>;
}
