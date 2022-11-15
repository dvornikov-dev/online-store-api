import { Length } from 'class-validator';

export class TypeDto {
    @Length(4, 12)
    readonly name: string;
}
