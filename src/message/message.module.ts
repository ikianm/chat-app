import { Module } from "@nestjs/common";
import { MessageController } from "./message.controller";
import { MessageService } from "./services/message.service";
import { MongooseModule } from "@nestjs/mongoose";
import { Message, MessageSchema } from "./message.schema";
import { MessageRepository } from "./message.repository";
import { MessageGateway } from "./message.gateway";
import { AuthModule } from "../auth/auth.module";
import { MessageApiService } from "./services/messageApi.service";
import { UserModule } from "../user/user.module";


@Module({
    imports: [
        MongooseModule.forFeature([{ name: Message.name, schema: MessageSchema }]),
        AuthModule,
        UserModule
    ],
    controllers: [MessageController],
    providers: [MessageRepository, MessageService, MessageApiService, MessageGateway],
    exports: [MessageApiService]
})
export class MessageModule { }