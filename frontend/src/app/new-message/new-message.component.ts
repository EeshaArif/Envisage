import { WebService } from './../web.service';
import { Component, OnInit } from '@angular/core';
import { Message } from '../Interfaces/message';

@Component({
  selector: 'app-new-message',
  templateUrl: './new-message.component.html',
  styleUrls: ['./new-message.component.css'],
})
export class NewMessageComponent implements OnInit {
  constructor(private service: WebService) {}
  message: Message = {
    owner: '',
    text: '',
  };

  ngOnInit(): void {}

  post(): void {
    this.service.postMessage(this.message);
  }
}
