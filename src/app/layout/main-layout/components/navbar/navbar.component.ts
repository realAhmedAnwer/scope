import { initFlowbite } from 'flowbite';
import { Component, inject, OnInit } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { AuthService } from '@core/auth/services/auth.service';
import { NotificationsService } from '@core/services/notifications/notifications.service';
import { LangSwitchComponent } from '@shared/components/lang-switch/lang-switch.component';
import { TranslatePipe } from '@ngx-translate/core';

@Component({
  selector: 'app-navbar',
  imports: [RouterLink, RouterLinkActive, LangSwitchComponent, TranslatePipe],
  templateUrl: './navbar.component.html',
})
export class NavbarComponent implements OnInit {
  private readonly _authService = inject(AuthService);
  private readonly _notificationsService = inject(NotificationsService);

  userName: string = '';
  photo: string = ''
  unreadCount: number = 0;

  ngOnInit(): void {
    const user = JSON.parse(localStorage.getItem('user') ?? 'null');
    this.userName = user?.name ?? 'User';
    this.photo = user?.photo ?? '/assets/avatar.png'

    initFlowbite();

    this._notificationsService.getUnreadCount().subscribe({
      next: (res) => {
        this.unreadCount = res?.data?.count ?? res?.data?.unreadCount ?? 0;
      },
      error: () => {
        this.unreadCount = 0;
      },
    });
  }
  logout(): void {
    this._authService.signout();
  }
}
