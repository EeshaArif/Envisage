import { WebService } from './../web.service';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Message } from '../interfaces/message';

@Component({
  selector: 'app-messages',
  templateUrl: './messages.component.html',
  styleUrls: ['./messages.component.css'],
})
export class MessagesComponent implements OnInit {
  messages: Message[] = [];
  constructor(public service: WebService, private route: ActivatedRoute) {}
  ngOnInit() {
    const name = this.route.snapshot.params.name;
    this.service.getMessages(name);
    this.service.messageSubject.subscribe((messages) => {
      this.messages = messages as Message[];
    });
  }
}
