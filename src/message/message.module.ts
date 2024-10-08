import { Module } from "@nestjs/common";
import { MessageController } from "./message.controller";
import { MessageService } from "./message.service";
import { MongooseModule } from "@nestjs/mongoose";
import { Message, MessageSchema } from "./message.schema";
import { MessageRepository } from "./message.repository";
import { MessageGateway } from "./message.gateway";
import { AuthModule } from "../auth/auth.module";


@Module({
    imports: [
        MongooseModule.forFeature([{ name: Message.name, schema: MessageSchema }]),
        AuthModule
    ],
    controllers: [MessageController],
    providers: [MessageRepository, MessageService, MessageGateway],
})
export class MessageModule { }