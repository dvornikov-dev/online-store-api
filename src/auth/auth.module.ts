import { forwardRef, Module } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtModule } from '@nestjs/jwt';
import { SequelizeModule } from '@nestjs/sequelize';
import { User } from 'src/users/users.model';
import { UsersModule } from 'src/users/users.module';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';

@Module({
    imports: [
        SequelizeModule.forFeature([User]),
        JwtModule.registerAsync({
            useFactory: async (configService: ConfigService) => ({
                secret: configService.get<string>('PRIVATE_KEY'),
                signOptions: {
                    expiresIn: '24h',
                },
            }),
            inject: [ConfigService],
        }),
        forwardRef(() => UsersModule),
    ],
    controllers: [AuthController],
    providers: [AuthService],
    exports: [JwtModule],
})
export class AuthModule {}
