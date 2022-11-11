import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { UserCreateDto } from './dto/user-create.dto';
import { User } from './user.model';

@Injectable()
export class UsersService {
    constructor(
        @InjectModel(User)
        private userModel: typeof User,
    ) {}

    async findAll(): Promise<User[]> {
        return this.userModel.findAll();
    }

    async findByEmail(email: string): Promise<User> {
        return this.userModel.findOne({ where: { email } });
    }

    async create(userCreateDto: UserCreateDto, hashPassword: string): Promise<User> {
        return this.userModel.create({ ...userCreateDto, password: hashPassword });
    }
}
