import { Body, Controller, Post, UseGuards } from "@nestjs/common";
import { MessageService } from "./message.service";
import { SendMessageDto } from "./dto/sendMessage.dto";
import { MessageGateway } from "./message.gateway";
import { JwtAuthGuard } from "../auth/guards/jwtAuth.guard";


@Controller('messages')
export class MessageController {

    constructor(
        private readonly messageService: MessageService,
        private readonly messageGateway: MessageGateway
    ) { }

    @UseGuards(JwtAuthGuard)
    @Post()
    send(@Body() sendMessageDto: SendMessageDto) {
        this.messageGateway.privateMessage(sendMessageDto);
        return this.messageService.send(sendMessageDto);
    }

}