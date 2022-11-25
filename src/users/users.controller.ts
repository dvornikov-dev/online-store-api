import { Controller, Get, Req, UseGuards } from '@nestjs/common';
import { AuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { RolesGuard } from 'src/auth/guards/roles.guard';
import { Basket } from 'src/baskets/baskets.model';
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

    @UseGuards(AuthGuard, RolesGuard)
    @Get('/basket')
    async getBasket(@Req() { user }): Promise<Basket | null> {
        const userModel = await this.usersService.findById(user.id);
        return userModel.bakset;
    }
}
