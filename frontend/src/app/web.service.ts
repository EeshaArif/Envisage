import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { catchError } from 'rxjs/operators';
import { throwError } from 'rxjs';
@Injectable({
  providedIn: 'root',
})
export class WebService {
  BASE_URL = 'http://localhost:3000';
  messages: any = [];
  constructor(private http: HttpClient, private sb: MatSnackBar) {
    this.getMessages();
  }
  async getMessages() {
    var response: any = this.http.get(`${this.BASE_URL}/api/message`).pipe(
      catchError((err) => {
        this.sb.open('Unable to get messages', 'close', { duration: 5000 });
        return throwError('Cannot Get Messages');
      })
    );
    response.subscribe((messages: any) => (this.messages = messages));
  }
  async postMessage(message: Message) {
    var response = this.http.post(`${this.BASE_URL}/api/message`, message);
    response.subscribe();
    this.messages.push(message);
  }
}
interface Message {
  text: string;
  owner: string;
}
interface MessagesResponse {
  messages: Message[];
}
