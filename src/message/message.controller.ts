import { Body, Controller, Post } from "@nestjs/common";
import { MessageService } from "./message.service";
import { SendMessageDto } from "./dto/sendMessage.dto";


@Controller('messages')
export class MessageController {

    constructor(private readonly messageService: MessageService) { }

    @Post()
    send(@Body() sendMessageDto: SendMessageDto) {
        return this.messageService.send(sendMessageDto);
    }

}