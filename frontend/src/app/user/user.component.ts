import { Component, OnInit } from '@angular/core';
import { UpdateUserModel } from '../models/user';
import { WebService } from '../services/web.service';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css'],
})
export class UserComponent implements OnInit {
  constructor(private service: WebService) {}
  user: UpdateUserModel = {
    firstName: '',
    lastName: '',
  };

  ngOnInit(): void {}

  post(): void {
    this.service.updateUser(this.user).subscribe();
    this.service.getUser().subscribe((res) => {
      console.log(res);
    });
  }
}
