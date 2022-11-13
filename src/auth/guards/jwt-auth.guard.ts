import { Injectable, CanActivate, ExecutionContext, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Observable } from 'rxjs';

@Injectable()
export class AuthGuard implements CanActivate {
    constructor(private jwtService: JwtService) {}

    canActivate(context: ExecutionContext): boolean | Promise<boolean> | Observable<boolean> {
        const request = context.switchToHttp().getRequest();
        try {
            const auth = request.headers.authorization.split(' ');
            const bearer = auth[0];
            const token = auth[1];
            if (bearer !== 'Bearer' && !token) {
                throw new UnauthorizedException({ message: 'Invalid authorization' });
            }
            const user = this.jwtService.verify(token);
            request.user = user;
            return true;
        } catch (e) {
            throw new UnauthorizedException({ message: 'Invalid authorization' });
        }
    }
}
