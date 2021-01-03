import { AuthService } from './../services/auth.service';
import { WebService } from '../services/web.service';
import { Component, OnInit } from '@angular/core';
import { Message } from '../models/message';

@Component({
  selector: 'app-new-message',
  templateUrl: './new-message.component.html',
  styleUrls: ['./new-message.component.css'],
})
export class NewMessageComponent implements OnInit {
  constructor(private service: WebService, private authService: AuthService) {}
  message: Message = {
    owner: this.authService.name,
    text: '',
  };

  ngOnInit(): void {}

  post(): void {
    this.service.postMessage(this.message);
  }
}
