import {
    Body,
    Controller,
    Get,
    Param,
    Post,
    Query,
    UploadedFile,
    UseGuards,
    UseInterceptors,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { Product } from './products.model';
import { ProductsService } from './products.service';
import { editFileName } from './utils/editFileName';
import { FindAllDto } from './dto/findAll.dto';
import { Roles } from 'src/auth/roles.decorator';
import { AuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { RolesGuard } from 'src/auth/guards/roles.guard';
import { CreateProductDto } from './dto/product.dto';

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

    @Roles('ADMIN')
    @UseGuards(AuthGuard, RolesGuard)
    @Post()
    @UseInterceptors(
        FileInterceptor('img', {
            storage: diskStorage({
                destination: './static',
                filename: editFileName,
            }),
        }),
    )
    async create(
        @Body() createProductDto: CreateProductDto,
        @UploadedFile() img: Express.Multer.File,
    ): Promise<Product> {
        const product = await this.productsService.create(createProductDto, img);
        return product;
    }
}
