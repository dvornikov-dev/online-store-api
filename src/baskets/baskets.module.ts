import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { AuthModule } from 'src/auth/auth.module';
import { Product } from 'src/products/products.model';
import { ProductsModule } from 'src/products/products.module';
import { BasketProduct } from './basket.product.model';
import { BasketsController } from './baskets.controller';
import { Basket } from './baskets.model';
import { BasketsService } from './baskets.service';

@Module({
    controllers: [BasketsController],
    providers: [BasketsService],
    imports: [
        SequelizeModule.forFeature([Basket, BasketProduct, Product]),
        AuthModule,
        ProductsModule,
    ],
})
export class BasketsModule {}
