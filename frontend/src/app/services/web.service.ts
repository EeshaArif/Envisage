import { User } from './../models/user';
import { AuthService } from './auth.service';
import { environment } from '../../environments/environment';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { MatSnackBar } from '@angular/material/snack-bar';
import { catchError, map } from 'rxjs/operators';
import { throwError, Subject, Observable } from 'rxjs';
import { Message } from '../models/message';
@Injectable({
  providedIn: 'root',
})
export class WebService {
  BASE_URL = environment.apiUrl;
  private messagesStore: Message[] = [];
  private messageSubject: Subject<Message[]> = new Subject();
  messages: Observable<Message[]> = this.messageSubject.asObservable();

  constructor(
    private http: HttpClient,
    private sb: MatSnackBar,
    private authService: AuthService
  ) {
    this.getMessages(null);
  }
  getMessages(user: User | null): void {
    // const userUrl = user ? '/' + user : '';
    this.http
      .get<Message[]>(`${this.BASE_URL}/messages${user ? '/' + user : ''}`)
      .pipe(
        catchError((err) => {
          this.sb.open('Unable to get messages', 'close', { duration: 5000 });
          return throwError('Cannot Get Messages');
        })
      )
      .subscribe((messages) => {
        this.messagesStore = messages;
        this.messageSubject.next(this.messagesStore);
      });
  }
  postMessage(message: Message): void {
    this.http
      .post(`${this.BASE_URL}/messages`, message)
      .pipe(
        catchError((err) => {
          this.sb.open('Unable to post message', 'close', { duration: 5000 });
          return throwError('Cannot Post Message');
        })
      )
      .subscribe();
    this.messagesStore.push(message);
    this.messageSubject.next(this.messagesStore);
  }
  getUser(): Observable<User> {
    return this.http.get<User>(
      `${this.BASE_URL}/users/me`,
      this.authService.tokenHeader
    );
  }
  updateUser(userData: User): Observable<User> {
    return this.http.post<User>(
      `${this.BASE_URL}/users/me`,
      userData,
      this.authService.tokenHeader
    );
  }
}
