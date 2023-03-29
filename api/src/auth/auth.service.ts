import { Injectable, Logger, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectRepository } from '@nestjs/typeorm';
import { AuthRepository } from './auth.repository';
import { SigninAuthDto } from './dto/signin-auth.dto';
import { SignupAuthDto } from './dto/signup-auth.dto';

import * as bcrypt from 'bcrypt';
import { JwtPayload } from 'src/_helper/jwt-payload.interface';

@Injectable()
export class AuthService {
  // 
  // logger
  private logger = new Logger('AuthService');

  // constructor
  constructor(
    @InjectRepository(AuthRepository)
    private readonly rep: AuthRepository,
    private srv: JwtService,
  ) {
    this.logger.verbose('--- constructor ---');
  }

  // signup
  async signup(
    signupDto: SignupAuthDto
  ): Promise<void> {
    this.logger.verbose(`signup->createDto: ${JSON.stringify(signupDto)}`);
    this.logger.verbose(`---`);
    return this.rep.signup(signupDto);
  }

  // signin
  async signin(
    signinDto: SigninAuthDto,
  ): Promise<{ accessToken: string }> {
    // 
    const { username, password } = signinDto;
    this.logger.verbose(`signin->username: ${JSON.stringify(username)}`);
    this.logger.verbose(`signin->password: ${JSON.stringify(password)}`);
    this.logger.verbose('---');

    const user = await this.rep.findOne({ username });

    this.logger.verbose(`signin->user: ${JSON.stringify(user)}`);
    this.logger.verbose('---');
    // 
    if (user && (await bcrypt.compare(password, user.password))) {
      // 
      const payload: JwtPayload = { username };
      const accessToken: string = await this.srv.sign(payload);
      this.logger.verbose(`signin->accessToken: ${JSON.stringify(accessToken)}`);
      this.logger.verbose('---');
      return { accessToken };
      // 
    } else {
      // 
      this.logger.verbose('--- error ---');
      throw new UnauthorizedException('Please check your login credentials');
      // 
    }
  }

}
