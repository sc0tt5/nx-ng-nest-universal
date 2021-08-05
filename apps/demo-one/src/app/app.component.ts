import { Component, OnInit } from '@angular/core';

import { ChatService } from './chat.service';

@Component({
  selector: 'nx-ng-nest-universal-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  public title = 'demo-one';
  public message = '';
  public messages: string[] = [];

  constructor(private chatService: ChatService) {}

  ngOnInit() {
    this.chatService.receiveChat().subscribe((message: string) => {
      this.messages.push(message);
    });
  }

  addChat() {
    this.chatService.sendChat(this.message);
    this.message = '';
  }
}
