import { IsEnum, IsOptional, IsString, Matches, MaxLength, MinLength } from 'class-validator';
import { UserStatus } from '../enum/user-status.enum';

export class UpdateAuthDto {

    @IsString()
    @MinLength(4)
    @MaxLength(20)
    username: string;

    @IsString()
    @MinLength(8)
    @MaxLength(32)
    @Matches(/((?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/, {
        message: 'password is too weak',
    })
    password: string;

    @IsString()
    @MinLength(1)
    @MaxLength(20)
    firstname: string;

    @IsString()
    @MinLength(1)
    @MaxLength(20)
    lastname: string;

    
}