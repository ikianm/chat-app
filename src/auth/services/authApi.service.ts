import { JwtService } from '@nestjs/jwt';
import { appConfig } from '../../../configs/app.config';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { User } from '../../user/user.schema';

@Injectable()
export class AuthApiService {

    constructor(
        private readonly jwtService: JwtService
    ) { }

    verifyAccessToken(jwtToken: string) {
        let user: Partial<User>;
        try {
            user = this.jwtService.verify(jwtToken);
        } catch (err) {
            throw new UnauthorizedException('token is not valid');
        }

        return user;
    }


}
