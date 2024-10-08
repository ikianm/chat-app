import { BadRequestException, Injectable } from '@nestjs/common';
import { UserApiService } from '../user/services/userApi.service';
import { RegisterDto } from './dto/register.dto';
import { hash } from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { User } from '../user/user.schema';

@Injectable()
export class AuthService {

    constructor(
        private readonly userApiService: UserApiService,
        private readonly jwtService: JwtService
    ) { }

    async validateUser(username: string, password: string): Promise<User> {

        const user = await this.userApiService.findByUsername(username);
        if (!user && user.password !== password) return null;

        return user;

    }

    login(user: Partial<User>): { accessToken: string } {
        const payload = { username: user.username, _id: user._id };

        return {
            accessToken: this.jwtService.sign(payload)
        };
    }

    async register(registerDto: RegisterDto) {
        const isUsernameInUse = (await this.userApiService.findByUsername(registerDto.username));
        if (isUsernameInUse) throw new BadRequestException('username already in use');

        const hashedPassword = await hash(registerDto.password, 10);
        const newUser = await this.userApiService.create(registerDto.username, hashedPassword);

        return {
            _id: newUser._id,
            username: newUser.username
        };
    }

}
