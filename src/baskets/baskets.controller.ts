import { Controller, Get } from '@nestjs/common';
import { Basket } from './baskets.model';
import { BasketsService } from './baskets.service';

@Controller('baskets')
export class BasketsController {
    constructor(private readonly basketsService: BasketsService) {}

    @Get('/test')
    async getHello(): Promise<Basket[]> {
        return this.basketsService.findAll();
    }
}
