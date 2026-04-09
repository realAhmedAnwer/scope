import { CommonModule, DatePipe } from '@angular/common';
import { Component, inject, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';
import { NotificationsService } from '@core/services/notifications/notifications.service';
import { finalize } from 'rxjs';
import { TranslatePipe } from '@ngx-translate/core';

@Component({
  selector: 'app-notification',
  imports: [CommonModule, RouterLink, DatePipe, TranslatePipe],
  templateUrl: './notification.component.html',
})
export class NotificationComponent implements OnInit {
  private readonly _notificationsService = inject(NotificationsService);

  notifications: any[] = [];
  page = 1;
  limit = 10;
  hasLoaded = false;

  ngOnInit(): void {
    this.load();
  }

  load(): void {
    this._notificationsService
      .getNotifications(this.page, this.limit)
      .pipe(finalize(() => (this.hasLoaded = true)))
      .subscribe({
        next: (res) => {
          this.notifications = res?.data?.notifications ?? [];
        },
      });
  }

  markRead(id: string): void {
    this._notificationsService.markAsRead(id).subscribe({
      next: () => this.load(),
    });
  }

  markAllRead(): void {
    this._notificationsService.markAllAsRead().subscribe({
      next: () => this.load(),
    });
  }
}
