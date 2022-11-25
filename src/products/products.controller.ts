import {
    Body,
    Controller,
    Delete,
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
import { FindAllDto } from './dto/find-all.dto';
import { Roles } from 'src/auth/roles.decorator';
import { AuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { RolesGuard } from 'src/auth/guards/roles.guard';
import { ProductCreateDto } from './dto/product.dto';
import { ProductDeleteDto } from './dto/delete.dto';

@Controller('products')
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
        @Body() createProductDto: ProductCreateDto,
        @UploadedFile() img: Express.Multer.File,
    ): Promise<Product> {
        const product = await this.productsService.create(createProductDto, img);
        return product;
    }

    @Roles('ADMIN')
    @UseGuards(AuthGuard, RolesGuard)
    @Delete()
    async delete(@Body() { id }: ProductDeleteDto): Promise<number> {
        return await this.productsService.delete(id);
    }
}
