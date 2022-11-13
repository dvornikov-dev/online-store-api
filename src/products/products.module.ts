import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { Brand } from '../brands/brands.model';
import { Type } from '../types/types.model';
import { ProductInfo } from './product.info.model';
import { ProductsController } from './products.controller';
import { Product } from './products.model';
import { ProductsService } from './products.service';
import { TypeBrand } from '../types/type.brand.model';
import { AuthModule } from 'src/auth/auth.module';

@Module({
    controllers: [ProductsController],
    providers: [ProductsService],
    imports: [
        SequelizeModule.forFeature([Product, ProductInfo, Type, Brand, TypeBrand]),
        AuthModule,
    ],
})
export class ProductsModule {}
