import { isPlatformBrowser } from '@angular/common';
import { Inject, Injectable, PLATFORM_ID } from '@angular/core';
import { Observable } from 'rxjs';
import { io, Socket } from 'socket.io-client';

@Injectable({
  providedIn: 'root',
})
export class ChatService {
  private socket: Socket;

  constructor(@Inject(PLATFORM_ID) private platformId: Object) {
    if (isPlatformBrowser(this.platformId)) {
      this.connect();
    }
  }

  sendChat(message) {
    console.log('sendChat from Angular', message);
    this.socket.emit('chat', message);
  }

  receiveChat() {
    if (isPlatformBrowser(this.platformId)) {
      return new Observable((observer) => {
        this.socket.on('chat', (message) => {
          observer.next(message);
        });
      });
    }
  }

  private connect(): void {
    const namespace = 'chat';
    const path = '/ws';
    this.socket = io(`http://localhost:3001/${namespace}`, { path });

    this.socket.on('connect', () => {
      console.log('WebSocket online...');
    });

    this.socket.on('disconnect', (reason) => {
      console.log('WebSocket disconnected...', reason);
    });
  }

  private disconnect(): void {
    this.socket.disconnect();
  }
}
