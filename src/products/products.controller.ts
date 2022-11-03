import { Controller, Get } from '@nestjs/common';
import { Product } from './products.model';
import { ProductsService } from './products.service';

@Controller('products')
export class ProductsController {
    constructor(private readonly productsService: ProductsService) {}

    @Get('/test')
    async getHello(): Promise<Product[]> {
        return this.productsService.findAll();
    }
}
