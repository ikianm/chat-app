import { Injectable, UnauthorizedException } from "@nestjs/common";
import { PassportStrategy } from "@nestjs/passport";
import { Strategy } from "passport-local";
import { AuthService } from "../services/auth.service";


@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {

    constructor(private authService: AuthService) {
        super(); // strategy configurations defined here
    }

    async validate(username: string, password: string): Promise<any> {

        const user = await this.authService.validateUser(username, password);
        if (!user) throw new UnauthorizedException('Invalid credentials');

        return {
            _id: user._id,
            username: user.username,
            groups: user.groups
        } // sets req.user authomatically

    }

}