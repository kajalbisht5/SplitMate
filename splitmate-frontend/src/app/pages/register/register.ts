
import { Component } from '@angular/core';
import {
  AbstractControl,
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  ValidationErrors,
  ValidatorFn,
  Validators
} from '@angular/forms';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';

const passwordMatchValidator: ValidatorFn = (
  control: AbstractControl
): ValidationErrors | null => {

  const password = control.get('password')?.value;
  const confirmPassword = control.get('confirmPassword')?.value;

  if (!password || !confirmPassword) {
    return null;
  }

  return password === confirmPassword
    ? null
    : { passwordMismatch: true };
};

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterLink],
  templateUrl: './register.html',
  styleUrl: './register.scss'
})
export class Register {

  registerForm: FormGroup;
  showPassword = false;
  showConfirmPassword = false;
  submitted = false;

  constructor(private fb: FormBuilder) {

    this.registerForm = this.fb.group({

      fullName: ['', [
        Validators.required,
        Validators.minLength(3)
      ]],

      email: ['', [
        Validators.required,
        Validators.email
      ]],

      password: ['', [
        Validators.required,
        Validators.minLength(8)
      ]],

      confirmPassword: ['', [
        Validators.required
      ]],

      terms: [false, Validators.requiredTrue]

    }, {
      validators: passwordMatchValidator
    });
  }

  get f() {
    return this.registerForm.controls;
  }

  togglePassword() {
    this.showPassword = !this.showPassword;
  }

  toggleConfirmPassword() {
    this.showConfirmPassword = !this.showConfirmPassword;
  }

  onRegister() {

    this.submitted = true;

    if (this.registerForm.invalid) {
      this.registerForm.markAllAsTouched();
      return;
    }

    const userData = {
      fullName: this.f['fullName'].value,
      email: this.f['email'].value,
      password: this.f['password'].value
    };

    console.log('Registration data:', userData);

    alert('Registration form validated successfully! Backend connection will be added later.');
  }
}
