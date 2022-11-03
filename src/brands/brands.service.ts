import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Brand } from './brands.model';

@Injectable()
export class BrandsService {
    constructor(
        @InjectModel(Brand)
        private brandModel: typeof Brand,
    ) {}

    async findAll(): Promise<Brand[]> {
        return this.brandModel.findAll();
    }

    async create(name): Promise<Brand> {
        const brand = this.brandModel.create({ name });
        return brand;
    }
}
