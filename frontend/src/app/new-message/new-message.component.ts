import { WebService } from './../web.service';
import { Component, OnInit, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-new-message',
  templateUrl: './new-message.component.html',
  styleUrls: ['./new-message.component.css'],
})
export class NewMessageComponent implements OnInit {
  @Output() onPosted = new EventEmitter();
  constructor(private WebService: WebService) {}

  ngOnInit(): void {}
  message = {
    owner: '',
    text: '',
  };

  post() {
    this.WebService.postMessage(this.message).subscribe();
    this.onPosted.emit(this.message);
  }
}
