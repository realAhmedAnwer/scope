import { Component, inject } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { UsersService } from '@core/services/users.service';
import { Router } from '@angular/router';
import { finalize } from 'rxjs';
import { TranslatePipe } from '@ngx-translate/core';

@Component({
  selector: 'app-reset-password',
  imports: [ReactiveFormsModule, TranslatePipe],
  templateUrl: './reset-password.component.html',
})
export class ResetPasswordComponent {
  private readonly _fb = inject(FormBuilder);
  private readonly _usersService = inject(UsersService);
  private readonly _router = inject(Router);

  isLoading = false;

  form = this._fb.nonNullable.group({
    password: ['', [Validators.required]],
    newPassword: [
      '',
      [
        Validators.required,
        Validators.pattern(/^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$ %^&*-]).{8,}$/),
      ],
    ],
  });

  submit(): void {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }

    this.isLoading = true;
    this._usersService
      .changePassword(this.form.getRawValue())
      .pipe(finalize(() => (this.isLoading = false)))
      .subscribe({
        next: (res) => {
          const newToken = res?.data?.token;
          const user = res?.data?.user;
          if (newToken) localStorage.setItem('accessToken', newToken);
          if (user) localStorage.setItem('user', JSON.stringify(user));
          this._router.navigate(['/profile']);
        },
      });
  }
}
