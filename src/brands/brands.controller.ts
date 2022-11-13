import { Controller, Get, Post, Req, UseGuards } from '@nestjs/common';
import { Request } from 'express';
import { AuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { RolesGuard } from 'src/auth/guards/roles.guard';
import { Roles } from 'src/auth/roles.decorator';
import { Brand } from './brands.model';
import { BrandsService } from './brands.service';

@Controller('brand')
export class BrandsController {
    constructor(private readonly brandsService: BrandsService) {}

    @Get()
    async getAll(): Promise<Brand[]> {
        return this.brandsService.findAll();
    }

    @Roles('ADMIN')
    @UseGuards(AuthGuard, RolesGuard)
    @Post()
    async create(@Req() req: Request): Promise<Brand> {
        const { name } = req.query;
        const brand = await this.brandsService.create(name);
        return brand;
    }
}
