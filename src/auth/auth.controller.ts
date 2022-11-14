import { Body, Controller, Post, UsePipes } from '@nestjs/common';
import { ValidationPipe } from 'src/pipes/validation.pipe';
import { UserCreateDto } from 'src/users/dto/user-create.dto';
import { UserLoginDto } from 'src/users/dto/user-login.dto';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {
    constructor(private authService: AuthService) {}

    @Post('/registration')
    @UsePipes(new ValidationPipe())
    async registration(@Body() userCreateDto: UserCreateDto) {
        return this.authService.registration(userCreateDto);
    }

    @Post('/login')
    async login(@Body() userCreateDto: UserLoginDto) {
        return this.authService.login(userCreateDto);
    }
}
