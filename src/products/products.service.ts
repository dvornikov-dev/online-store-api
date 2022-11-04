import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Product } from './products.model';

@Injectable()
export class ProductsService {
    constructor(
        @InjectModel(Product)
        private productModel: typeof Product,
    ) {}

    async findAll(): Promise<Product[]> {
        return this.productModel.findAll();
    }

    async create(name, price, filename, brandId, typeId): Promise<Product> {
        const product = await this.productModel.create({
            name,
            price,
            img: filename,
            brandId,
            typeId,
        });
        return product;
    }
}
