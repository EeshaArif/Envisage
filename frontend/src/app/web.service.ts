import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
// import { map } from 'rxjs/operators';
@Injectable({
  providedIn: 'root',
})
export class WebService {
  BASE_URL = 'http://localhost:3000';
  constructor(private http: HttpClient) {}
  getMessages() {
    return this.http.get<MessagesResponse>(`${this.BASE_URL}/api/message`);
  }
  postMessage(message: Message) {
    return this.http.post(`${this.BASE_URL}/api/message`, message);
  }
}
interface Message {
  text: string;
  owner: string;
}
interface MessagesResponse {
  messages: Message[];
}
