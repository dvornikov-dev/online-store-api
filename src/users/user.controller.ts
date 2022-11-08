import { Controller, Get } from '@nestjs/common';
import { User } from './user.model';
import { UsersService } from './user.service';

@Controller('/user')
export class UsersController {
    constructor(private readonly usersService: UsersService) {}

    @Get('/test')
    async getHello(): Promise<User[]> {
        const user = await this.usersService.findAll();
        return user;
    }
}
