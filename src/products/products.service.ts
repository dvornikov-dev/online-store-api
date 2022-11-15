import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { FindAllDto } from './dto/findAll.dto';
import { CreateProductDto } from './dto/product.dto';
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

    async create(
        { name, price, brandId, typeId, info = null }: CreateProductDto,
        img: Express.Multer.File,
    ): Promise<Product> {
        if (!img) {
            // TODO: error
        }
        const product = await this.productModel.create({
            // for key constraints
            name,
            price,
            img: img.filename,
            brandId,
            typeId,
        });

        if (info) {
            const infoArray = JSON.parse(info); // TODO: add validation
            infoArray.forEach((i) => {
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
