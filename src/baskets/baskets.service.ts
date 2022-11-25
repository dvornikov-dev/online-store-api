import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { ProductsService } from 'src/products/products.service';
import { BasketProduct } from './basket.product.model';
import { Basket } from './baskets.model';

@Injectable()
export class BasketsService {
    constructor(
        @InjectModel(Basket)
        private basketModel: typeof Basket,
        @InjectModel(BasketProduct)
        private basketProductModel: typeof BasketProduct,
        private readonly productsService: ProductsService,
    ) {}

    async findAll(): Promise<Basket[]> {
        return this.basketModel.findAll();
    }

    async addProduct(productId: number, userId: number) {
        const product = await this.productsService.getOne(productId);
        if (!product) {
            throw new HttpException('Product not found', HttpStatus.BAD_REQUEST);
        }
        let basket = await this.basketModel.findOne({ where: { userId } });
        if (!basket) {
            basket = await this.basketModel.create({ userId });
        }
        return this.basketProductModel.create({ productId, basketId: basket.id });
    }
}
