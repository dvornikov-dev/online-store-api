import { Length, IsEmail } from 'class-validator';

export class UserLoginDto {
    @IsEmail()
    readonly email: string;
    @Length(4, 16)
    readonly password: string;
}
