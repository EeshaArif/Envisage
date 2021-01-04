import { AuthService } from '../_services/auth.service';
import { Component, OnInit } from '@angular/core';
import {
  AbstractControl,
  AsyncValidatorFn,
  FormBuilder,
  ValidationErrors,
  ValidatorFn,
  Validators,
} from '@angular/forms';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
})
export class RegisterComponent implements OnInit {
  form;
  constructor(private fb: FormBuilder, private auth: AuthService) {
    this.form = fb.group(
      {
        firstName: ['', Validators.required],
        lastName: ['', Validators.required],
        email: ['', [Validators.required, Validators.email]],
        password: ['', [Validators.required, Validators.minLength(6)]],
        confirmPassword: ['', Validators.required],
      },
      {
        validators: [matchingFields(), this.userExists()],
      }
    );
  }
  onSubmit(): void {
    this.auth.register(this.form.value);
  }
  inValid(control: string): boolean {
    return (
      this.form.controls[control].invalid && this.form.controls[control].touched
    );
  }
  uniqueEmail() {
    let email = '';
    if (this.form) {
      email = this.form.controls['email']?.value;
    }
    this.auth.checkEmailNotTaken(email).subscribe((res) => {
      if (res) {
        unique = false;
        //this.form.controls['email'].updateValueAndValidity();
      } else {
        unique = true;
      }
      this.form.controls['email'].updateValueAndValidity();
    });
    return unique;
  }
  userExists(): ValidatorFn {
    return (controls: AbstractControl) => {
      if (!this.uniqueEmail()) {
        return { userExists: true };
      }
      return null;
    };
  }

  ngOnInit(): void {
    unique = true;
  }
}
let unique = true;
function matchingFields(): ValidatorFn {
  return (controls: AbstractControl) => {
    if (
      controls.get('password')?.value !== controls.get('confirmPassword')?.value
    ) {
      return { mismatchedFields: true };
    }
    return null;
  };
}
