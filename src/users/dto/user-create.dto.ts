import { Length, IsEmail } from 'class-validator';

export class UserCreateDto {
    @Length(3, 12)
    readonly firstName: string;
    @Length(3, 12)
    readonly lastName: string;
    @IsEmail()
    readonly email: string;

    @Length(4, 16)
    readonly password: string;
}
