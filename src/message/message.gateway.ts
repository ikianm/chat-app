import { OnGatewayConnection, OnGatewayDisconnect, OnGatewayInit, WebSocketGateway, WebSocketServer } from "@nestjs/websockets";
import { Server, Socket } from "socket.io";
import { AuthApiService } from "../auth/services/authApi.service";
import { ObjectId } from "mongoose";
import { SendMessageDto } from "./dto/sendMessage.dto";

@WebSocketGateway()
export class MessageGateway implements OnGatewayConnection, OnGatewayDisconnect {

    constructor(
        private readonly authApiService: AuthApiService,
    ) { }

    @WebSocketServer() wss: Server

    private connections = new Map<ObjectId, Socket>();
    private rooms = [];

    handleConnection(client: Socket, ...args: any[]) {

        const accessToken = client.handshake.query.accessToken as string;
        const user = this.authApiService.verifyAccessToken(accessToken);

        if (this.connections.has(user._id)) return;

        user.groups.forEach(groupId => {
            client.join(`${groupId}`);
            if (!this.rooms.includes(groupId)) this.rooms.push(groupId);
        });

        this.connections.set(user._id, client);

    }

    handleDisconnect(client: Socket) {

        this.connections.forEach((value, key) => {
            if (value === client) this.connections.delete(key);
        });

    }

    privateMessage(sendMessageDto: SendMessageDto) {
        const { recepientId } = sendMessageDto;

        if (!this.connections.has(recepientId)) return;


        const isRecepientAGroup = this.rooms.includes(recepientId);
        if (isRecepientAGroup) {
            return this.wss.to(`${recepientId}`).emit('groupMessage', sendMessageDto);
        }

        const receiverSocket = this.connections.get(sendMessageDto.recepientId);
        return receiverSocket.emit('privateMessage', JSON.stringify(sendMessageDto));
    }


}