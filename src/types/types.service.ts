import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Type } from './types.model';

@Injectable()
export class TypesService {
    constructor(
        @InjectModel(Type)
        private typeModel: typeof Type,
    ) {}

    async findAll(): Promise<Type[]> {
        return this.typeModel.findAll();
    }

    async create(name): Promise<Type> {
        const type = this.typeModel.create({ name });
        return type;
    }
}
