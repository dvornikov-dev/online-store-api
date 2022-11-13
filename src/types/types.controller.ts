import { Controller, Get, Post, Req, UseGuards } from '@nestjs/common';
import { Request } from 'express';
import { AuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { RolesGuard } from 'src/auth/guards/roles.guard';
import { Roles } from 'src/auth/roles.decorator';
import { Type } from './types.model';
import { TypesService } from './types.service';

@Controller('type')
export class TypesController {
    constructor(private readonly typesService: TypesService) {}

    @Get()
    async getAll(): Promise<Type[]> {
        return this.typesService.findAll();
    }

    @Roles('ADMIN')
    @UseGuards(AuthGuard, RolesGuard)
    @Post()
    async create(@Req() req: Request): Promise<Type> {
        const { name } = req.query;
        const type = await this.typesService.create(name);
        return type;
    }
}
