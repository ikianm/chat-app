import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Message } from "./message.schema";
import { Model, ObjectId } from "mongoose";
import { SendMessageDto } from "./dto/sendMessage.dto";


@Injectable()
export class MessageRepository {

    constructor(
        @InjectModel(Message.name)
        private readonly messageModel: Model<Message>
    ) { }

    async create(sendMessageDto: SendMessageDto): Promise<Message> {
        const newMessage = new this.messageModel({
            ...sendMessageDto,
            sentAt: new Date()
        });
        return await newMessage.save();
    }

    async findPrivateMessages(senderId: ObjectId, recepientId: ObjectId): Promise<Message[]> {
        return await this.messageModel.find({
            senderId,
            recepientId
        }).lean(true);
    }

    async findGroupMessages(groupId: ObjectId): Promise<Message[]> {
        return await this.messageModel.find({ recepientId: groupId }).lean(true);
    }

}