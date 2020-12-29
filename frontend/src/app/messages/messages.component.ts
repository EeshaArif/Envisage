import { WebService } from './../web.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-messages',
  templateUrl: './messages.component.html',
  styleUrls: ['./messages.component.css'],
})
export class MessagesComponent implements OnInit {
  // placeholder data
  /*messages = [
    {
      text: 'some text',
      owner: 'Tim',
    },
    {
      text: 'more text',
      owner: 'Tana',
    },
  ];
  */
  messages: any;
  constructor(private WebService: WebService) {}

  async ngOnInit() {
    this.WebService.getMessages().subscribe((messages) => {
      this.messages = messages;
    });
  }
}
