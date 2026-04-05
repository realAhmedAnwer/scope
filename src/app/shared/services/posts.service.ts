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

  getAllPosts(): Observable<any> {
    return this._httpClient.get(`${environment.baseUrl}/${API_ENDPOINTS.posts.all}`);
  }

  getFeedPosts(
    only: 'following' | 'me' | 'all',
    page: number = 1,
    limit: number = 10,
  ): Observable<any> {
    return this._httpClient.get(`${environment.baseUrl}/${API_ENDPOINTS.posts.feed(only, page, limit)}`);
  }

  getBookmarkedPosts(): Observable<any> {
    return this._httpClient.get(`${environment.baseUrl}/${API_ENDPOINTS.posts.bookmarked}`);
  }

  getPostLikes(postId: string, page: number = 1, limit: number = 20): Observable<any> {
    return this._httpClient.get(
      `${environment.baseUrl}/${API_ENDPOINTS.posts.likes(postId, page, limit)}`,
    );
  }

  getPost(id: string): Observable<any> {
    return this._httpClient.get(`${environment.baseUrl}/${API_ENDPOINTS.posts.single(id)}`);
  }

  createPost(data: FormData): Observable<any> {
    return this._httpClient.post(`${environment.baseUrl}/${API_ENDPOINTS.posts.create}`, data);
  }

  updatePost(id: string, data: FormData): Observable<any> {
    return this._httpClient.put(`${environment.baseUrl}/${API_ENDPOINTS.posts.update(id)}`, data);
  }

  deletePost(id: string): Observable<any> {
    return this._httpClient.delete(`${environment.baseUrl}/${API_ENDPOINTS.posts.delete(id)}`);
  }

  toggleLike(postId: string): Observable<any> {
    return this._httpClient.put(`${environment.baseUrl}/${API_ENDPOINTS.posts.toggleLike(postId)}`, {});
  }

  toggleBookmark(postId: string): Observable<any> {
    return this._httpClient.put(`${environment.baseUrl}/${API_ENDPOINTS.posts.toggleBookmark(postId)}`, {});
  }

  share(postId: string): Observable<any> {
    return this._httpClient.post(`${environment.baseUrl}/${API_ENDPOINTS.posts.share(postId)}`, {});
  }
}
