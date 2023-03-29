import { Controller, Get, Post, Body, Patch, Param, Delete, Logger } from '@nestjs/common';
import { AuthService } from './auth.service';
import { SigninAuthDto } from './dto/signin-auth.dto';
import { SignupAuthDto } from './dto/signup-auth.dto';
import { UpdateAuthDto } from './dto/update-auth.dto';
import { User } from './entities/auth.entity';

@Controller('auth')
export class AuthController {
  // 
  // logger
  private logger = new Logger('AuthController');

  // constructor
  constructor(
    private readonly srv: AuthService
  ) {
    this.logger.verbose('--- constructor ---');
  }

  // signup
  @Post('/signup')
  signup(
    @Body() signupDto: SignupAuthDto
  ): Promise<void> {
    this.logger.verbose(`signup->signupDto: ${JSON.stringify(signupDto)}`);
    this.logger.verbose(`---`);
    return this.srv.signup(signupDto);
  }

  // signin
  @Post('/signin')
  signin(
    @Body() signinDto: SigninAuthDto
    ): Promise<{ accessToken: string }> {
      this.logger.verbose(`signin->createDto: ${JSON.stringify(signinDto)}`);
      this.logger.verbose(`---`);
      return this.srv.signin(signinDto);
  }

}
