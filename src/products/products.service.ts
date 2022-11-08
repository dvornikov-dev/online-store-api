import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { FindAllDto } from './dto/findAll.dto';
import { ProductInfo } from './product.info.model';
import { Product } from './products.model';

@Injectable()
export class ProductsService {
    constructor(
        @InjectModel(Product)
        private productModel: typeof Product,
        @InjectModel(ProductInfo)
        private productInfoModel: typeof ProductInfo,
    ) {}

    async findAll(query: FindAllDto): Promise<{ rows: Product[]; count: number }> {
        const { typeId, brandId } = query;
        let { limit, page } = query;
        page ??= 1;
        limit ??= 9;
        const offset = limit * page - limit;
        let products;
        if (!typeId && !brandId) {
            products = this.productModel.findAndCountAll({ offset, limit });
        }

        if (!typeId && brandId) {
            products = this.productModel.findAndCountAll({
                where: {
                    brandId,
                },
                offset,
                limit,
            });
        }

        if (typeId && !brandId) {
            products = this.productModel.findAndCountAll({
                where: {
                    typeId,
                },
                offset,
                limit,
            });
        }

        if (typeId && brandId) {
            products = this.productModel.findAndCountAll({
                where: {
                    brandId,
                    typeId,
                },
                offset,
                limit,
            });
        }

        return products;
    }

    // TODO: dto body decorator
    async create(name, price, filename, brandId, typeId, info = null): Promise<Product> {
        const product = await this.productModel.create({
            name,
            price,
            img: filename,
            brandId,
            typeId,
        });

        if (info) {
            info = JSON.parse(info); // TODO: add validation
            info.forEach((i) => {
                this.productInfoModel.create({
                    title: i.title,
                    description: i.description,
                    productId: product.id,
                });
            });
        }
        return product;
    }

    async getOne(id): Promise<Product> {
        return this.productModel.findOne({
            where: {
                id,
            },
            include: {
                model: ProductInfo,
            },
        });
    }
}
