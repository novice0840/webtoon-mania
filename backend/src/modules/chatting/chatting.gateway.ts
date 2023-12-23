import { MessageBody, SubscribeMessage, WebSocketGateway, WebSocketServer, WsResponse } from '@nestjs/websockets';
import { from, Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Server } from 'socket.io';

@WebSocketGateway({
  cors: {
    origin: '*',
  },
})
export class ChattingGateway {
  private rooms: Map<string, Set<string>> = new Map();

  @WebSocketServer()
  server: Server;

  @SubscribeMessage('connect')
  async connect() {
    console.log('connected');
  }

  @SubscribeMessage('room1')
  async getMessage(@MessageBody() data) {
    this.server.emit('room1', data);
    return data;
  }

  @SubscribeMessage('joinRoom')
  handleJoinRoom(@MessageBody() roomName: string, client: any) {
    // Join the specified room
    client.join(roomName);

    // Add the client id to the room set
    const clientsInRoom = this.rooms.get(roomName) || new Set();
    clientsInRoom.add(client.id);
    this.rooms.set(roomName, clientsInRoom);

    // Notify other clients in the room about the new join
    this.server.to(roomName).emit('joinedRoom', `${client.id} has joined ${roomName}`);
  }

  @SubscribeMessage('leaveRoom')
  handleLeaveRoom(@MessageBody() roomName: string, client: any) {
    // Leave the specified room
    client.leave(roomName);

    // Remove the client id from the room set
    const clientsInRoom = this.rooms.get(roomName) || new Set();
    clientsInRoom.delete(client.id);
    this.rooms.set(roomName, clientsInRoom);

    // Notify other clients in the room about the leave
    this.server.to(roomName).emit('leftRoom', `${client.id} has left ${roomName}`);
  }

  @SubscribeMessage('sendMessage')
  handleMessage(@MessageBody() { roomName, message }: { roomName: string; message: string }, client: any) {
    // Broadcast the message to all clients in the specified room
    this.server.to(roomName).emit('message', { sender: client.id, message });
  }
}
