import { OnGatewayConnection, OnGatewayDisconnect } from '@nestjs/websockets';
import { Socket } from 'socket.io';
export declare class ConnectionGateway implements OnGatewayConnection, OnGatewayDisconnect {
    handleConnection(client: WebSocket, ...args: any[]): void;
    handleDisconnect(client: WebSocket): void;
    handleMessage(client: Socket, body: {
        user_id: number;
        session: string;
    }): string;
}
