import { Module } from '@nestjs/common';
import { BrandsService } from './brands.service';
import { BrandsController } from './brands.controller';
import { SequelizeModule } from '@nestjs/sequelize';
import { Brand } from './brands.model';
import { AuthModule } from 'src/auth/auth.module';

@Module({
    providers: [BrandsService],
    controllers: [BrandsController],
    imports: [SequelizeModule.forFeature([Brand]), AuthModule],
})
export class BrandsModule {}
