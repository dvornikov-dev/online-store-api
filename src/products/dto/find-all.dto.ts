import { ProductInfo } from '../product.info.model';

export class FindAllDto {
    readonly typeId: string | null;
    readonly brandId: string | null;
    readonly productInfo: ProductInfo[] | null;
    readonly limit: number | null;
    readonly page: number | null;
}
