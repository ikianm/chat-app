import { OnGatewayConnection, OnGatewayDisconnect, OnGatewayInit, WebSocketGateway } from "@nestjs/websockets";
import { Server, Socket } from "socket.io";

@WebSocketGateway()
export class MessageGateway implements OnGatewayInit, OnGatewayConnection, OnGatewayDisconnect {

    private connectedSockets = new Map<string, Socket>();


    afterInit(server: Server) {
        console.log('wss initialized');
    }

    handleConnection(client: Socket, ...args: any[]) {
        console.log(`${client.id} connected`);
    }

    handleDisconnect(client: Socket) {

    }



}