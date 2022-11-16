import { Length } from 'class-validator';

export class RoleCreateDto {
    @Length(4, 16)
    readonly name: string;
    @Length(4, 16)
    readonly description: string;
}
