import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  BASE_URL: string = environment.authUrl;
  NAME_KEY = 'name';
  TOKEN_KEY = 'token';

  constructor(private http: HttpClient, private router: Router) {}
  get name() {
    return localStorage.getItem(this.NAME_KEY);
  }
  get isAuthenticated() {
    return !!localStorage.getItem(this.TOKEN_KEY);
  }
  register(user: any): void {
    delete user.confirmPassword;
    this.http
      .post<{ firstName: string; token: string }>(
        `${this.BASE_URL}/register`,
        user
      )
      .subscribe((res) => {
        if (!res.token) {
          return;
        }
        localStorage.setItem(this.TOKEN_KEY, res.token);
        localStorage.setItem(this.NAME_KEY, res.firstName);
        this.router.navigate(['/']);
      });
  }

  logout() {
    localStorage.removeItem(this.NAME_KEY);
    localStorage.removeItem(this.TOKEN_KEY);
  }
}
