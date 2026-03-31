import { API_ENDPOINTS } from '@core/constants/api.constants';
import { environment } from '@env/environment';
import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class PostsService {
  private readonly _httpClient = inject(HttpClient);
  headers: object = {
    headers: {
      AUTHORIZATION: `Bearer ${localStorage.getItem('accessToken')}`,
    },
  };

  getAllPosts(): Observable<any> {
    return this._httpClient.get(`${environment.baseUrl}/${API_ENDPOINTS.posts.all}`, this.headers);
  }

  getPost(id: string): Observable<any> {
    return this._httpClient.get(
      `${environment.baseUrl}/${API_ENDPOINTS.posts.single(id)}`,
      this.headers,
    );
  }

  createPost(data: FormData): Observable<any> {
    return this._httpClient.post(
      `${environment.baseUrl}/${API_ENDPOINTS.posts.create}`,
      data,
      this.headers,
    );
  }

  deletePost(id: string): Observable<any> {
    return this._httpClient.delete(
      `${environment.baseUrl}/${API_ENDPOINTS.posts.delete(id)}`,
      this.headers,
    );
  }
}
