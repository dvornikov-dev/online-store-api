import { IsNotEmpty } from 'class-validator';

export class ProductDeleteDto {
    @IsNotEmpty()
    readonly id: string;
}
