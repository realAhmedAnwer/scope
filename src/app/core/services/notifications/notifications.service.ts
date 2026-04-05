import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '@env/environment';
import { API_ENDPOINTS } from '@core/constants/api.constants';

@Injectable({
  providedIn: 'root',
})
export class NotificationsService {
  private readonly _httpClient = inject(HttpClient);

  getNotifications(page: number = 1, limit: number = 10): Observable<any> {
    return this._httpClient.get(`${environment.baseUrl}/${API_ENDPOINTS.notifications.all(page, limit)}`);
  }

  getUnreadCount(): Observable<any> {
    return this._httpClient.get(`${environment.baseUrl}/${API_ENDPOINTS.notifications.unreadCount}`);
  }

  markAsRead(notificationId: string): Observable<any> {
    return this._httpClient.patch(
      `${environment.baseUrl}/${API_ENDPOINTS.notifications.markRead(notificationId)}`,
      {},
    );
  }

  markAllAsRead(): Observable<any> {
    return this._httpClient.patch(`${environment.baseUrl}/${API_ENDPOINTS.notifications.readAll}`, {});
  }
}

