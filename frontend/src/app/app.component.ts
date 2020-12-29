import { NewMessageComponent } from './new-message/new-message.component';
import { MessagesComponent } from './messages/messages.component';
import { Component, ViewChild } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  @ViewChild(MessagesComponent) messagesComp: any;
  onPosted(message: any) {
    this.messagesComp.messages.push(message);
  }
}
