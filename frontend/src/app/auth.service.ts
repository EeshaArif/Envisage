import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  BASE_URL: string = environment.authUrl;

  constructor(private http: HttpClient) {}
  register(user: any): void {
    delete user.confirmPassword;
    this.http.post(`${this.BASE_URL}/register`, user).subscribe();
  }
}
