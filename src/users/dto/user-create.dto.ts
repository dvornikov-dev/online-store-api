import { Length } from '@nestjs/class-validator';

export class UserCreateDto {
    @Length(3, 12)
    readonly firstName: string;

    @Length(3, 12)
    readonly lastName: string;
    readonly email: string;
    readonly password: string;
}
