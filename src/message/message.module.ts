import { Module } from "@nestjs/common";
import { MessageController } from "./message.controller";
import { MessageService } from "./message.service";
import { MongooseModule } from "@nestjs/mongoose";
import { Message, MessageSchema } from "./message.schema";
import { MessageRepository } from "./message.repository";


@Module({
    imports: [
        MongooseModule.forFeature([{ name: Message.name, schema: MessageSchema }])
    ],
    controllers: [MessageController],
    providers: [MessageRepository, MessageService],
})
export class MessageModule { }