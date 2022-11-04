import { Controller, Get, Post, Req, UploadedFile, UseInterceptors } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { Request } from 'express';
import { Product } from './products.model';
import { ProductsService } from './products.service';
import { editFileName } from './utils/editFileName';

@Controller('product')
export class ProductsController {
    constructor(private readonly productsService: ProductsService) {}

    @Get()
    async getAll(): Promise<Product[]> {
        return this.productsService.findAll();
    }

    @Post()
    @UseInterceptors(
        FileInterceptor('img', {
            storage: diskStorage({
                destination: './static',
                filename: editFileName,
            }),
        }),
    )
    async create(@Req() req: Request, @UploadedFile() img: Express.Multer.File): Promise<Product> {
        const { name, price, typeId, brandId } = req.body;
        const product = await this.productsService.create(
            name,
            price,
            img.filename,
            typeId,
            brandId,
        );
        return product;
    }
}
