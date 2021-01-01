import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { MatSnackBar } from '@angular/material/snack-bar';
import { catchError } from 'rxjs/operators';
import { throwError } from 'rxjs';
import { Message } from './interfaces/message';
@Injectable({
  providedIn: 'root',
})
export class WebService {
  BASE_URL = 'http://localhost:3000';
  messages: Message[] = [];
  constructor(private http: HttpClient, private sb: MatSnackBar) {
    this.getMessages(null);
  }
  getMessages(user: any): void {
    user = user ? '/' + user : '';
    this.http
      .get<Message[]>(`${this.BASE_URL}/api/messages${user}`)
      .pipe(
        catchError((err) => {
          this.sb.open('Unable to get messages', 'close', { duration: 5000 });
          return throwError('Cannot Get Messages');
        })
      )
      .subscribe((messages) => {
        this.messages = messages;
      });
  }
  postMessage(message: Message): void {
    this.http
      .post(`${this.BASE_URL}/api/messages`, message)
      .pipe(
        catchError((err) => {
          this.sb.open('Unable to post message', 'close', { duration: 5000 });
          return throwError('Cannot Post Message');
        })
      )
      .subscribe();
    this.messages.push(message);
  }
}
