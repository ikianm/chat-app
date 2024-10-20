import { RequestContext } from "nestjs-request-context";
import { User } from "../user/user.schema";

export class RequestContextService {

    static getCurrentUser(): Omit<User, 'password'> {
        const ctx = RequestContext.currentContext.req;
        return ctx.user;
    }

}