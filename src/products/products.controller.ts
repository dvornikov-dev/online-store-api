import {
    Controller,
    Get,
    Param,
    Post,
    Query,
    Req,
    UploadedFile,
    UseInterceptors,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { Request } from 'express';
import { Product } from './products.model';
import { ProductsService } from './products.service';
import { editFileName } from './utils/editFileName';
import { FindAllDto } from './dto/findAll.dto';

@Controller('product')
export class ProductsController {
    constructor(private readonly productsService: ProductsService) {}

    @Get()
    async getAll(@Query() query: FindAllDto): Promise<{ rows: Product[]; count: number }> {
        return this.productsService.findAll(query);
    }

    @Get('/:id')
    async getOne(@Param() params: { id: number }): Promise<Product> {
        const { id } = params;
        return this.productsService.getOne(id);
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
        const { name, price, typeId, brandId, info } = req.body; // TODO: dto
        const product = await this.productsService.create(
            name,
            price,
            img.filename,
            typeId,
            brandId,
            info,
        );
        return product;
    }
}
