import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { User } from './user.model';
import { UsersService } from './user.service';
import { UsersController } from './user.controller';
import { RolesModule } from 'src/roles/roles.module';

@Module({
    controllers: [UsersController],
    providers: [UsersService],
    imports: [SequelizeModule.forFeature([User]), RolesModule],
    exports: [UsersService],
})
export class UsersModule {}
