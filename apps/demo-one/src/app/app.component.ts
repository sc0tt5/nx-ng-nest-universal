import { Component, OnInit } from '@angular/core';
import { Socket } from 'ngx-socket-io';

import { ChatService } from './chat.service';

@Component({
  selector: 'nx-ng-nest-universal-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  public title = 'demo-one';
  public users = 0;
  public message = '';
  public messages: string[] = [];

  constructor(private chatService: ChatService) {}

  ngOnInit() {
    this.chatService.receiveChat().subscribe((message: string) => {
      console.log('receiveChat in Angular:::', message);
      this.messages.push(message);
    });
  }

  addChat() {
    this.chatService.sendChat(this.message);
    this.message = '';
  }
}
