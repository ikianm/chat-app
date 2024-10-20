import { BadRequestException, Injectable, UnauthorizedException } from '@nestjs/common';
import { UserApiService } from '../../user/services/userApi.service';
import { RegisterDto } from '../dto/register.dto';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { User } from '../../user/user.schema';

@Injectable()
export class AuthService {

    constructor(
        private readonly userApiService: UserApiService,
        private readonly jwtService: JwtService
    ) { }

    async validateUser(username: string, password: string): Promise<User> {

        const user = await this.userApiService.findByUsername(username);
        if (!user) throw new BadRequestException('no user found');

        const isPasswordCorrect = await bcrypt.compare(password, user.password);
        if (!isPasswordCorrect) throw new UnauthorizedException('invalid password');

        return user;

    }

    login(user: Partial<User>): { accessToken: string } {
        const payload = { _id: user._id, username: user.username, groups: user.groups };

        return {
            accessToken: this.jwtService.sign(payload)
        };
    }

    async register(registerDto: RegisterDto) {
        const isUsernameInUse = (await this.userApiService.findByUsername(registerDto.username));
        if (isUsernameInUse) throw new BadRequestException('username already in use');

        const hashedPassword = await bcrypt.hash(registerDto.password, 10);
        const newUser = await this.userApiService.create(registerDto.username, hashedPassword);

        return {
            _id: newUser._id,
            username: newUser.username,
            groups: newUser.groups
        };
    }

}
