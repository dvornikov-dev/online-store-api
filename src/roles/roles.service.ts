import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { CreateRoleDto } from './dto/role.dto';
import { Role } from './roles.model';

@Injectable()
export class RolesService {
    constructor(@InjectModel(Role) private roleModel: typeof Role) {}

    async create(createRoleDto: CreateRoleDto): Promise<Role> {
        return this.roleModel.create(createRoleDto);
    }

    async getRoleByName(name: string): Promise<Role> {
        return this.roleModel.findOne({ where: { name } });
    }
}
