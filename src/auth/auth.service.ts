import { HttpException, HttpStatus, Injectable, UnauthorizedException } from '@nestjs/common';
import { UserCreateDto } from 'src/users/dto/user-create.dto';
import { UserLoginDto } from 'src/users/dto/user-login.dto';
import { UsersService } from 'src/users/users.service';
import { hash, compare } from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { User } from 'src/users/users.model';

@Injectable()
export class AuthService {
    constructor(private userService: UsersService, private jwtService: JwtService) {}

    async registration(userCreateDto: UserCreateDto) {
        const { email, password } = userCreateDto;
        const candidate = await this.userService.findByEmail(email);
        if (candidate) {
            throw new HttpException('Such user is already registered', HttpStatus.BAD_REQUEST);
        }
        const hashPassword = await hash(password, 4);
        const user = await this.userService.create(userCreateDto, hashPassword);
        return this.generateToken(user);
    }

    private async generateToken(user: User) {
        const payload = {
            id: user.id,
            email: user.email,
            roles: user.roles,
        };
        return {
            token: this.jwtService.sign(payload),
        };
    }

    async login(userLoginDto: UserLoginDto) {
        const user = await this.validateUser(userLoginDto);
        return this.generateToken(user);
    }

    private async validateUser(userDto: UserLoginDto) {
        const user = await this.userService.findByEmail(userDto.email);
        if (!user) {
            throw new UnauthorizedException({ message: 'Invalid credintials' });
        }
        const passwordCheck = await compare(userDto.password, user.password);
        if (user && passwordCheck) {
            return user;
        }
        throw new UnauthorizedException({ message: 'Invalid credintials' });
    }
}
