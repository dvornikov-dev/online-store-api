import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { TypeBrand } from './type.brand.model';
import { TypesController } from './types.controller';
import { Type } from './types.model';
import { TypesService } from './types.service';

@Module({
    controllers: [TypesController],
    providers: [TypesService],
    imports: [SequelizeModule.forFeature([Type, TypeBrand])],
})
export class TypesModule {}
