import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '@env/environment';
import { API_ENDPOINTS } from '@core/constants/api.constants';

@Injectable({
  providedIn: 'root',
})
export class UsersService {
  private readonly _httpClient = inject(HttpClient);

  getProfileData(): Observable<any> {
    return this._httpClient.get(`${environment.baseUrl}/${API_ENDPOINTS.users.profileData}`);
  }

  changePassword(data: { password: string; newPassword: string }): Observable<any> {
    return this._httpClient.patch(`${environment.baseUrl}/${API_ENDPOINTS.users.changePassword}`, data);
  }

  uploadPhoto(photo: File): Observable<any> {
    const formData = new FormData();
    formData.append('photo', photo);
    return this._httpClient.put(`${environment.baseUrl}/${API_ENDPOINTS.users.uploadPhoto}`, formData);
  }

  toggleFollow(userId: string): Observable<any> {
    return this._httpClient.put(`${environment.baseUrl}/users/${userId}/follow`, {});
  }

  getSuggestions(page: number = 1, limit: number = 10): Observable<any> {
    return this._httpClient.get(`${environment.baseUrl}/${API_ENDPOINTS.users.suggestions(page, limit)}`);
  }
}

