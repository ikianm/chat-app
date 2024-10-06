import { Injectable } from "@nestjs/common";
import { MessageRepository } from "./message.repository";
import { SendMessageDto } from "./dto/sendMessage.dto";


@Injectable()
export class MessageService {

    constructor(private readonly messageRepo: MessageRepository) { }

    async send(sendMessageDto: SendMessageDto) {
        return await this.messageRepo.create(sendMessageDto);
    }

}