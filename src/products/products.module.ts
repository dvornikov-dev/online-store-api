import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { Brand } from './brands.model';
import { Type } from './types.model';
import { ProductInfo } from './product.info.model';
import { ProductsController } from './products.controller';
import { Product } from './products.model';
import { ProductsService } from './products.service';
import { TypeBrand } from './type.brand.model';

@Module({
    controllers: [ProductsController],
    providers: [ProductsService],
    imports: [SequelizeModule.forFeature([Product, ProductInfo, Type, Brand, TypeBrand])],
})
export class ProductsModule {}
