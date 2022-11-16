import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { RolesService } from 'src/roles/roles.service';
import { UserCreateDto } from './dto/user-create.dto';
import { User } from './users.model';

@Injectable()
export class UsersService {
    constructor(
        @InjectModel(User)
        private userModel: typeof User,
        private rolesService: RolesService,
    ) {}

    async findAll(): Promise<User[]> {
        return this.userModel.findAll({ include: { all: true } });
    }

    async findByEmail(email: string): Promise<User> {
        return this.userModel.findOne({ where: { email }, include: { all: true } });
    }

    async create(userCreateDto: UserCreateDto, hashPassword: string): Promise<User> {
        const user = await this.userModel.create({ ...userCreateDto, password: hashPassword });
        const role = await this.rolesService.getRoleByName('USER');
        user.$set('roles', [role.id]);
        user.roles = [role];
        return user;
    }
}
