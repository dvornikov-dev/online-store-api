import { Body, Controller, Post, Req, UseGuards } from '@nestjs/common';
import { AuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { RolesGuard } from 'src/auth/guards/roles.guard';
import { Roles } from 'src/auth/roles.decorator';
import { BasketsService } from './baskets.service';
import { ProductAddDto } from './dto/add-product.dto';

@Controller('baskets')
export class BasketsController {
    constructor(private readonly basketsService: BasketsService) {}

    @Roles('USER', 'ADMIN')
    @UseGuards(AuthGuard, RolesGuard)
    @Post('/add')
    async addProduct(@Req() { user }, @Body() { productId }: ProductAddDto) {
        return this.basketsService.addProduct(productId, user.id);
    }
}
