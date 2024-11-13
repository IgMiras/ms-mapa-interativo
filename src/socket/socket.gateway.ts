import {
  WebSocketGateway,
  WebSocketServer,
  OnGatewayConnection,
  OnGatewayDisconnect,
} from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';
import { OccurrencesService } from '../occurrences/occurrences.service';
import { forwardRef, Inject } from '@nestjs/common';

@WebSocketGateway()
export class SocketGateway implements OnGatewayConnection, OnGatewayDisconnect {
  @WebSocketServer()
  server: Server;

  constructor(
    @Inject(forwardRef(() => OccurrencesService))
    private readonly occurrencesService: OccurrencesService,
  ) {}

  async handleConnection(client: Socket) {
    console.log('Client connected:', client.id);
  }

  handleDisconnect(client: Socket) {
    console.log('Client disconnected:', client.id);
  }

  broadcastNewOccurrence(occurrence: any) {
    this.server.emit('newOccurrence', occurrence);
    console.log('(Socket.io) ocorrencia enviada para todos conectados');
  }
}
