import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-messages',
  templateUrl: './messages.component.html',
  styleUrls: ['./messages.component.css'],
})
export class MessagesComponent implements OnInit {
  constructor() {}

  ngOnInit(): void {}
  // placeholder data
  messages = [
    {
      text: 'some text',
      owner: 'Tim',
    },
    {
      text: 'more text',
      owner: 'Tana',
    },
  ];
}
