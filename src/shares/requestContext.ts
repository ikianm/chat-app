import { RequestContext } from "nestjs-request-context";

export class RequestContextService {

    static getCurrentUser() {
        const ctx = RequestContext.currentContext.req;
        return ctx.user;
    }

}