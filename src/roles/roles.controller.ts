import { Body, Controller, Get, Param, Post, UseGuards } from '@nestjs/common';
import { AuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { RolesGuard } from 'src/auth/guards/roles.guard';
import { Roles } from 'src/auth/roles.decorator';
import { RoleCreateDto } from './dto/role.dto';
import { RolesService } from './roles.service';

@Controller('roles')
export class RolesController {
    constructor(private roleService: RolesService) {}

    @Roles('ADMIN')
    @UseGuards(AuthGuard, RolesGuard)
    @Post()
    create(@Body() createRoleDto: RoleCreateDto) {
        return this.roleService.create(createRoleDto);
    }

    @Get('/:name')
    getByName(@Param('name') name: string) {
        return this.roleService.getRoleByName(name);
    }
}
