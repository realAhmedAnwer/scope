import { Component, inject } from '@angular/core';
import { AuthService } from '@core/auth/services/auth.service';
import { Router, RouterLink } from '@angular/router';
import { FormGroup, Validators, ReactiveFormsModule, FormBuilder } from '@angular/forms';
import { Subscription } from 'rxjs';
import { HttpErrorResponse } from '@angular/common/http';
import { TranslatePipe } from '@ngx-translate/core';

@Component({
  selector: 'app-login',
  imports: [ReactiveFormsModule, RouterLink, TranslatePipe],
  templateUrl: './login.component.html',
})
export class LoginComponent {
  private readonly _authService = inject(AuthService);
  private readonly _router = inject(Router);
  private readonly _formBuilder = inject(FormBuilder);

  loginForm: FormGroup = this._formBuilder.nonNullable.group({
    login: ['', [Validators.required, Validators.minLength(3)]],
    password: [
      '',
      [
        Validators.required,
        Validators.pattern(/^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$ %^&*-]).{8,}$/),
      ],
    ],
  });
  registerSubscription: Subscription = new Subscription();
  isLoading: boolean = false;
  serverErrorMessage: string = '';

  login() {
    if (this.loginForm.valid) {
      this.isLoading = true;
      this.registerSubscription.unsubscribe();
      this.registerSubscription = this._authService.signin(this.loginForm.value).subscribe({
        next: (res) => {
          if (res.success) {
            localStorage.setItem('accessToken', res.data.token);
            localStorage.setItem('user', JSON.stringify(res.data.user));
            this._router.navigate(['/feed']);
          }
        },
        error: (err: HttpErrorResponse) => {
          this.isLoading = false;
        },
        complete: () => {
          this.isLoading = false;
        },
      });
    } else {
      this.loginForm.markAllAsTouched();
    }
  }
}
