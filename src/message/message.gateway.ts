import { OnGatewayConnection, OnGatewayDisconnect, OnGatewayInit, WebSocketGateway } from "@nestjs/websockets";
import { Socket } from "socket.io";


@WebSocketGateway()
export class MessageGateway implements OnGatewayInit, OnGatewayConnection, OnGatewayDisconnect {

    private connectedSockets = new Map<string, Socket>();

    afterInit(server: any) {
        // passport & session
    }

    handleConnection(client: any, ...args: any[]) {

    }

    handleDisconnect(client: any) {

    }



}