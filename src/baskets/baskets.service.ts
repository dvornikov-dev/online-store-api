import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Basket } from './baskets.model';

@Injectable()
export class BasketsService {
    constructor(
        @InjectModel(Basket)
        private basketModel: typeof Basket,
    ) {}

    async findAll(): Promise<Basket[]> {
        return this.basketModel.findAll();
    }
}
