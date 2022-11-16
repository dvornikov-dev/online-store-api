import { Controller, Get, UseGuards } from '@nestjs/common';
import { AuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { RolesGuard } from 'src/auth/guards/roles.guard';
import { User } from './users.model';
import { UsersService } from './users.service';

@Controller('/user')
export class UsersController {
    constructor(private readonly usersService: UsersService) {}

    @UseGuards(AuthGuard, RolesGuard)
    @Get('/test')
    async getHello(): Promise<User[]> {
        const user = await this.usersService.findAll();
        return user;
    }
}
