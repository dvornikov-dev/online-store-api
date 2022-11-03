import { Controller, Get, Post, Req } from '@nestjs/common';
import { Request } from 'express';
import { Brand } from './brands.model';
import { BrandsService } from './brands.service';

@Controller('brand')
export class BrandsController {
    constructor(private readonly brandsService: BrandsService) {}

    @Get()
    async getAll(): Promise<Brand[]> {
        return this.brandsService.findAll();
    }

    @Post()
    async create(@Req() req: Request): Promise<Brand> {
        const { name } = req.query;
        const brand = await this.brandsService.create(name);
        return brand;
    }
}
