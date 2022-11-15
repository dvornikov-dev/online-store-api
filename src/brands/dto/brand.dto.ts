import { Length } from 'class-validator';

export class CreateBrandDto {
    @Length(4, 16)
    readonly name: string;
}
