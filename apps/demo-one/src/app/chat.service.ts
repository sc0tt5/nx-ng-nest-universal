import { isPlatformBrowser } from '@angular/common';
import { Inject, Injectable, PLATFORM_ID } from '@angular/core';
import { Socket } from 'ngx-socket-io';

@Injectable({
  providedIn: 'root',
})
export class ChatService {
  constructor(
    @Inject(PLATFORM_ID) private platformId: Object,
    private socket: Socket
  ) {}

  sendChat(message) {
    console.log('sendChat from Angular', message);
    this.socket.emit('chat', message);
  }

  receiveChat() {
    if (isPlatformBrowser(this.platformId)) {
      return this.socket.fromEvent('chat');
    }
  }
}
