import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '@env/environment';
import { API_ENDPOINTS } from '@core/constants/api.constants';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private readonly _httpClient = inject(HttpClient);
  private readonly _router = inject(Router);

  signup(data: any): Observable<any> {
    return this._httpClient.post(`${environment.baseUrl}/${API_ENDPOINTS.users.signup}`, data);
  }
  signin(data: any): Observable<any> {
    return this._httpClient.post(`${environment.baseUrl}/${API_ENDPOINTS.users.signin}`, data);
  }
  signout(): void {
    localStorage.removeItem('accessToken');
    this._router.navigate(['/login']);
  }
}
