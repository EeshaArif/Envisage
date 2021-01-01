import { WebService } from './../web.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-new-message',
  templateUrl: './new-message.component.html',
  styleUrls: ['./new-message.component.css'],
})
export class NewMessageComponent implements OnInit {
  constructor(private WebService: WebService) {}

  ngOnInit(): void {}
  message = {
    owner: '',
    text: '',
  };

  post() {
    this.WebService.postMessage(this.message);
  }
}
