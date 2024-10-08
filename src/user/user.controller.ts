import { Controller } from "@nestjs/common";
import { UserService } from "./services/user.service";


@Controller()
export class UserController {

    constructor(
        private readonly privateChatService: UserService
    ){}

}