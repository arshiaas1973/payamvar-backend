import { ConnectedSocket, MessageBody, OnGatewayConnection, OnGatewayDisconnect, SubscribeMessage, WebSocketGateway } from '@nestjs/websockets';
import { Socket } from 'socket.io';
import configuration from 'src/config/configuration';

@WebSocketGateway(3050, {
  cors: {
    origin:[
      configuration().origins.frontend
    ],
  },
})
export class ConnectionGateway implements OnGatewayConnection, OnGatewayDisconnect {
  handleConnection(client: WebSocket, ...args: any[]) {
    console.log('Client connected');
    client.send(JSON.stringify({message:"Welcome to the WebSocket server!"}));
  }
  handleDisconnect(client: WebSocket) {
    console.log('Client disconnected');
  }
  @SubscribeMessage('connection')
  handleMessage(@ConnectedSocket() client: Socket,@MessageBody() body: {user_id:number,session:string}): string {
    console.log(client);
    console.log(typeof client);
    console.log(`The Request is "${JSON.stringify(body)}"`);
    return "Hello";
  }
  
}
