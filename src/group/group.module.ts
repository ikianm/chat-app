import { Module } from "@nestjs/common";
import { MongooseModule } from "@nestjs/mongoose";
import { Group, GroupSchema } from "./group.schema";
import { GroupController } from "./group.controller";
import { GroupRepository } from "./group.repository";
import { GroupService } from "./group.service";
import { UserModule } from "../user/user.module";
import { MessageModule } from "../message/message.module";


@Module({
    imports: [
        MongooseModule.forFeature([{ name: Group.name, schema: GroupSchema }]),
        UserModule,
        MessageModule
    ],
    controllers: [GroupController],
    providers: [GroupRepository, GroupService]
})
export class GroupModule { }