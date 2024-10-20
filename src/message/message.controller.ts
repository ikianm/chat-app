import { Body, Controller, Get, Param, Post, UseGuards } from "@nestjs/common";
import { MessageService } from "./services/message.service";
import { SendMessageDto } from "./dto/sendMessage.dto";
import { MessageGateway } from "./message.gateway";
import { JwtAuthGuard } from "../auth/guards/jwtAuth.guard";
import { ObjectIdParamDto } from "../shares/objectIdParam.dto";

@UseGuards(JwtAuthGuard)
@Controller('messages')
export class MessageController {

    constructor(
        private readonly messageService: MessageService,
        private readonly messageGateway: MessageGateway
    ) { }

    @Get(':objectId')
    getPrivateMessages(@Param() objectIdParamDto: ObjectIdParamDto) {
        return this.messageService.getPrivateMessages(objectIdParamDto.objectId);
    }

    @Post()
    send(@Body() sendMessageDto: SendMessageDto) {
        this.messageGateway.privateMessage(sendMessageDto);
        return this.messageService.send(sendMessageDto);
    }

}