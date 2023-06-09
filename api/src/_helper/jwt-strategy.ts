import { Injectable, Logger, UnauthorizedException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { PassportStrategy } from '@nestjs/passport';
import { InjectRepository } from '@nestjs/typeorm';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { JwtPayload } from './jwt-payload.interface';
import { User } from '../auth/entities/auth.entity';
import { AuthRepository } from '../auth/auth.repository';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
    // 
    private logger = new Logger('JwtStrategy');
    // 
    constructor(
        @InjectRepository(AuthRepository)
        private authRepository: AuthRepository,
        private configService: ConfigService,
    ) {
        super({
            secretOrKey: configService.get('JWT_SECRET'),
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
        });
    }
    // 
    async validate(payload: JwtPayload): Promise<User> {

        this.logger.verbose(`validate->payload: ${payload}`);

        const { username } = payload;
        const user: User = await this.authRepository.findOne({ username });

        if (!user) {
            throw new UnauthorizedException();
        }

        return user;
    }
    // 
}