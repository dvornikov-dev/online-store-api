import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { BasketProduct } from './basket.product.model';
import { BasketsController } from './baskets.controller';
import { Basket } from './baskets.model';
import { BasketsService } from './baskets.service';

@Module({
    controllers: [BasketsController],
    providers: [BasketsService],
    imports: [SequelizeModule.forFeature([Basket, BasketProduct])],
})
export class BasketsModule {}
