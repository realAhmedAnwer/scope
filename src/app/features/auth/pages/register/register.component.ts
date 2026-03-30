import { Component, inject } from '@angular/core';
import {
  AbstractControl,
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { AuthService } from '@core/auth/services/auth.service';
import { HttpErrorResponse } from '@angular/common/http';
import { Subscription } from 'rxjs';
import { Router, RouterLink } from '@angular/router';

@Component({
  selector: 'app-register',
  imports: [ReactiveFormsModule, RouterLink],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css',
})
export class RegisterComponent {
  private readonly _authService = inject(AuthService);
  private readonly _router = inject(Router);
  private readonly _formBuilder = inject(FormBuilder);

  registerForm: FormGroup = this._formBuilder.group(
    {
      name: ['', [Validators.required, Validators.minLength(3)]],
      username: [''],
      email: ['', [Validators.required, Validators.email]],
      dateOfBirth: ['', Validators.required],
      gender: ['', Validators.required],
      password: [
        '',
        [
          Validators.required,
          Validators.pattern(/^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$ %^&*-]).{8,}$/),
        ],
      ],
      rePassword: ['', [Validators.required]],
    },
    {
      validators: [this.confirmPassword],
    },
  );
  registerSubscription: Subscription = new Subscription();
  isLoading: boolean = false;
  serverErrorMessage: string = '';

  confirmPassword(formGroup: AbstractControl) {
    const password = formGroup.get('password')?.value;
    const rePassword = formGroup.get('rePassword')?.value;
    if (rePassword !== '' && password !== rePassword) {
      formGroup.get('rePassword')?.setErrors({ misMatch: true });
      return { misMatch: true };
    }
    return null;
  }

  register(): void {
    this.serverErrorMessage = '';
    if (this.registerForm.valid) {
      this.isLoading = true;
      this.registerSubscription.unsubscribe();
      this.registerSubscription = this._authService
        .signup({
          ...this.registerForm.value,
          username: this.registerForm.value.username?.trim || null,
        })
        .subscribe({
          next: (res) => {
            if (res.success) this._router.navigate(['/login']);
          },
          error: (err: HttpErrorResponse) => {
            this.isLoading = false;
            this.serverErrorMessage = err.error.message;
          },
          complete: () => {
            this.isLoading = false;
          },
        });
    } else {
      this.registerForm.markAllAsTouched();
    }
  }
}
