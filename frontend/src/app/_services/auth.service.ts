import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Router } from '@angular/router';
import { AuthResponse, Login } from '../_models/authResponse';
import { User } from '../_models/user';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  BASE_URL: string = environment.authUrl;
  NAME_KEY = 'name';
  TOKEN_KEY = 'token';

  constructor(private http: HttpClient, private router: Router) {}
  get name(): string | null {
    return localStorage.getItem(this.NAME_KEY);
  }
  get isAuthenticated(): boolean {
    return !!localStorage.getItem(this.TOKEN_KEY);
  }
  get tokenHeader(): { headers: HttpHeaders } {
    const header: HttpHeaders = new HttpHeaders({
      Authorization: 'Bearer ' + localStorage.getItem(this.TOKEN_KEY),
    });
    return { headers: header };
  }
  register(user: User): void {
    delete user.confirmPassword;
    this.http
      .post<AuthResponse>(`${this.BASE_URL}/register`, user)
      .subscribe((res) => {
        this.authenticate(res);
      });
  }

  logout(): void {
    localStorage.removeItem(this.NAME_KEY);
    localStorage.removeItem(this.TOKEN_KEY);
  }
  login(loginData: Login): void {
    this.http
      .post<AuthResponse>(`${this.BASE_URL}/login`, loginData)
      .subscribe((res) => {
        this.authenticate(res);
      });
  }
  authenticate(res: AuthResponse): void {
    if (!res.token) {
      return;
    }
    localStorage.setItem(this.TOKEN_KEY, res.token);
    localStorage.setItem(this.NAME_KEY, res.firstName);
    this.router.navigate(['/']);
  }
}
