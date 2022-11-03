import { Controller, Get, Post, Req } from '@nestjs/common';
import { Request } from 'express';
import { Type } from './types.model';
import { TypesService } from './types.service';

@Controller('type')
export class TypesController {
    constructor(private readonly typesService: TypesService) {}

    @Get()
    async getAll(): Promise<Type[]> {
        return this.typesService.findAll();
    }

    @Post()
    async create(@Req() req: Request): Promise<Type> {
        const { name } = req.query;
        const type = await this.typesService.create(name);
        return type;
    }
}
