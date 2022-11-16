import { Length } from 'class-validator';

export class TypeCreateDto {
    @Length(4, 12)
    readonly name: string;
}
