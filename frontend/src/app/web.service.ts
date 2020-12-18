import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
// import { map } from 'rxjs/operators';
@Injectable({
  providedIn: 'root',
})
export class WebService {
  constructor(private http: HttpClient) {}
  getMessages() {
    return this.http.get<MessagesResponse>('http://localhost:3000/message');
    /*  .pipe(
        map((response) => {
          return response.messages;
        })
      );*/
  }
}
interface Message {
  text: string;
  owner: string;
}
interface MessagesResponse {
  messages: Message[];
}
