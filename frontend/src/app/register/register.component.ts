import { ConditionalExpr } from '@angular/compiler';
import { Component, OnInit } from '@angular/core';
import {
  AbstractControl,
  FormBuilder,
  FormGroup,
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
  constructor(private fb: FormBuilder) {
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
    console.log(this.form.errors);
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