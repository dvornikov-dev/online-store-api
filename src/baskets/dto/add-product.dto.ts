import { IsNotEmpty } from 'class-validator';

export class ProductAddDto {
    @IsNotEmpty()
    readonly productId: number;
}
