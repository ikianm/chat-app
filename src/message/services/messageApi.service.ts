import { Injectable } from "@nestjs/common";
import { MessageRepository } from "../message.repository";
import { ObjectId } from "mongoose";
import { Message } from "../message.schema";


@Injectable()
export class MessageApiService {

    constructor(private readonly messageRepo: MessageRepository) { }

    async findGroupMessages(groupId: ObjectId): Promise<Message[]> {
        return await this.messageRepo.findGroupMessages(groupId);
    }

}