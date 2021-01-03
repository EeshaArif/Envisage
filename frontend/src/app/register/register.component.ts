import { AuthService } from '../_services/auth.service';
import { Component, OnInit } from '@angular/core';
import {
  AbstractControl,
  FormBuilder,
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
        password: ['', Validators.required],
        confirmPassword: ['', Validators.required],
      },
      {
        validators: matchingFields(),
      }
    );
  }
  onSubmit(): void {
    this.auth.register(this.form.value);
  }
  isValid(control: string): boolean {
    return (
      this.form.controls[control].invalid && this.form.controls[control].touched
    );
  }

  ngOnInit(): void {}
}

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
