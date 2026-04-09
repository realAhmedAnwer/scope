import { CommonModule, DatePipe } from '@angular/common';
import { Component, inject, OnInit } from '@angular/core';
import { UsersService } from '@core/services/users.service';
import { finalize } from 'rxjs';
import { TranslatePipe } from '@ngx-translate/core';

@Component({
  selector: 'app-profile',
  imports: [CommonModule, DatePipe, TranslatePipe],
  templateUrl: './profile.component.html',
})
export class ProfileComponent implements OnInit {
  private readonly _usersService = inject(UsersService);

  profile: any = null;
  profileReady = false;
  photoUploading = false;

  ngOnInit(): void {
    this.loadProfile();
  }

  loadProfile(): void {
    this.profileReady = false;
    this._usersService.getProfileData().pipe(
      finalize(() => (this.profileReady = true)),
    ).subscribe({
      next: (res: any) => {
        this.profile = res?.data?.user ?? res?.user ?? null;
      },
    });
  }

  onSelectPhoto(event: Event): void {
    const file = (event.target as HTMLInputElement).files?.[0];
    if (!file) return;
    this.photoUploading = true;
    this._usersService.uploadPhoto(file).pipe(
      finalize(() => (this.photoUploading = false)),
    ).subscribe({
      next: (res: any) => {
        if (res?.user?.photo) {
          this.profile = { ...this.profile, photo: res.user.photo };
        }
      },
    });
  }
}
