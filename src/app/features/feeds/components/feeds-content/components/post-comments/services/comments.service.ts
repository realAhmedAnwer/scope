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

  getComments(postId: string, page: number = 1, limit: number = 10): Observable<any> {
    return this._httpClient.get(`${environment.baseUrl}/${API_ENDPOINTS.comments.all(postId, page, limit)}`);
  }

  createComment(postId: string, data: FormData): Observable<any> {
    return this._httpClient.post(
      `${environment.baseUrl}/${API_ENDPOINTS.comments.create(postId)}`,
      data,
    );
  }

  getReplies(postId: string, commentId: string, page: number = 1, limit: number = 10): Observable<any> {
    return this._httpClient.get(
      `${environment.baseUrl}/${API_ENDPOINTS.comments.replies(postId, commentId, page, limit)}`,
    );
  }

  createReply(postId: string, commentId: string, data: FormData): Observable<any> {
    return this._httpClient.post(
      `${environment.baseUrl}/${API_ENDPOINTS.comments.createReply(postId, commentId)}`,
      data,
    );
  }

  updateComment(postId: string, commentId: string, data: FormData): Observable<any> {
    return this._httpClient.put(
      `${environment.baseUrl}/${API_ENDPOINTS.comments.update(postId, commentId)}`,
      data,
    );
  }

  deleteComment(postId: string, commentId: string): Observable<any> {
    return this._httpClient.delete(
      `${environment.baseUrl}/${API_ENDPOINTS.comments.delete(postId, commentId)}`,
    );
  }

  toggleCommentLike(postId: string, commentId: string): Observable<any> {
    return this._httpClient.put(
      `${environment.baseUrl}/${API_ENDPOINTS.comments.toggleLike(postId, commentId)}`,
      {},
    );
  }
}
