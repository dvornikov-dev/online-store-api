import { Module } from '@nestjs/common';
import { BrandsService } from './brands.service';
import { BrandsController } from './brands.controller';
import { SequelizeModule } from '@nestjs/sequelize';
import { Brand } from './brands.model';

@Module({
    providers: [BrandsService],
    controllers: [BrandsController],
    imports: [SequelizeModule.forFeature([Brand])],
})
export class BrandsModule {}
