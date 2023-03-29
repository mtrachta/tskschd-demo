import { ConfigService } from '@nestjs/config';
import { Strategy } from 'passport-jwt';
import { JwtPayload } from './jwt-payload.interface';
import { User } from '../auth/entities/auth.entity';
import { AuthRepository } from '../auth/auth.repository';
declare const JwtStrategy_base: new (...args: any[]) => Strategy;
export declare class JwtStrategy extends JwtStrategy_base {
    private authRepository;
    private configService;
    private logger;
    constructor(authRepository: AuthRepository, configService: ConfigService);
    validate(payload: JwtPayload): Promise<User>;
}
export {};
