import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { API_ENDPOINTS } from '@core/constants/api.constants';
import { environment } from '@env/environment';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class CommentsService {
  private readonly _httpClient = inject(HttpClient);

  getComments(postId: string): Observable<any> {
    return this._httpClient.get(`${environment.baseUrl}/${API_ENDPOINTS.comments.all(postId)}`);
  }

  createComment(postId: string, data: FormData) {
    return this._httpClient.post(
      `${environment.baseUrl}/${API_ENDPOINTS.comments.create(postId)}`,
      data,
    );
  }
}
