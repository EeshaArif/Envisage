import { Login } from '../_models/authResponse';
import { AuthService } from '../_services/auth.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  constructor(private auth: AuthService) {}
  loginData: Login = {
    email: '',
    password: '',
  };

  ngOnInit(): void {}
  login(): void {
    this.auth.login(this.loginData);
  }
}
