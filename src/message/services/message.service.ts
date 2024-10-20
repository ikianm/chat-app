import { BadRequestException, Injectable } from "@nestjs/common";
import { MessageRepository } from "../message.repository";
import { SendMessageDto } from "../dto/sendMessage.dto";
import { ObjectId } from "mongoose";
import { Message } from "../message.schema";
import { RequestContextService } from "../../shares/requestContext";
import { UserApiService } from "../../user/services/userApi.service";


@Injectable()
export class MessageService {

    constructor(
        private readonly messageRepo: MessageRepository,
        private readonly userApiService: UserApiService
    ) { }

    async getPrivateMessages(recepientId: ObjectId): Promise<Message[]> {

        const recepient = !!(await this.userApiService.findById(recepientId));
        if (!recepient) throw new BadRequestException('no user found with the given id');

        const currentUser = RequestContextService.getCurrentUser();

        return await this.messageRepo.findPrivateMessages(currentUser._id, recepientId);

    }

    async send(sendMessageDto: SendMessageDto): Promise<Message> {
        return await this.messageRepo.create(sendMessageDto);
    }

}