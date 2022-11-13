import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { AuthModule } from 'src/auth/auth.module';
import { TypeBrand } from './type.brand.model';
import { TypesController } from './types.controller';
import { Type } from './types.model';
import { TypesService } from './types.service';

@Module({
    controllers: [TypesController],
    providers: [TypesService],
    imports: [SequelizeModule.forFeature([Type, TypeBrand]), AuthModule],
})
export class TypesModule {}
