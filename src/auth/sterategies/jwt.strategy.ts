import { Injectable } from "@nestjs/common";
import { PassportStrategy } from "@nestjs/passport";
import { ExtractJwt, Strategy } from "passport-jwt";
import { appConfig } from "../../../configs/app.config";
import { User } from "../../user/user.schema";


@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {

    constructor() {
        super({
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
            ignoreExpiration: false,
            secretOrKey: appConfig().jwtSecret
        });

    }

    async validate(user: Partial<User>) {



        return {
            _id: user._id, username: user.username, groups: user.groups
        }; // sets req.user
    }

}