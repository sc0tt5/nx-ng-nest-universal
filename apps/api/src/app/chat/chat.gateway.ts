import {
  SubscribeMessage,
  WebSocketGateway,
  OnGatewayInit,
  WebSocketServer,
  OnGatewayConnection,
  OnGatewayDisconnect,
  MessageBody,
} from '@nestjs/websockets';
import { Logger } from '@nestjs/common';
import { Socket, Server } from 'socket.io';

@WebSocketGateway(3001, { cors: true, path: '/ws', namespace: 'chat' })
export class ChatGateway
  implements OnGatewayInit, OnGatewayConnection, OnGatewayDisconnect
{
  @WebSocketServer() server: Server;

  private logger: Logger = new Logger('ChatGateway');

  @SubscribeMessage('chat')
  handleMessage(@MessageBody() payload: string): void {
    this.logger.log(`Message received: ${payload}`);
    this.server.emit('chat', payload);
  }

  afterInit(server: Server) {
    this.logger.log(
      `WS server listening at ${server.server.httpServer._connectionKey}`
    );
  }

  handleDisconnect(client: Socket) {
    this.logger.log(`Client disconnected: ${client.id}`);
  }

  handleConnection(client: Socket, ...args: any[]) {
    this.logger.log(`Client connected: ${client.id}`);
  }
}
