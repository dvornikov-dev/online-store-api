import { Length, IsNotEmpty } from 'class-validator';

export class CreateProductDto {
    @Length(4, 12)
    readonly name: string;
    @IsNotEmpty()
    readonly price: number;

    @IsNotEmpty()
    readonly typeId: number;

    @IsNotEmpty()
    readonly brandId: number;

    readonly info: string | null;
}
