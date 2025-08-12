import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {environment} from '../../../environments/environment';
import {Comment} from '../../shared/models';

@Injectable({providedIn: 'root'})
export class CommentsService {
  constructor(private http: HttpClient) {
  }

  forReview(reviewId: number) {
    return this.http.get<Comment[]>(`${environment.apiUrl}/comments/review/${reviewId}`);
  }

  create(dto: { reviewId: number; parentId?: number | null; content: string }) {
    return this.http.post<Comment>(`${environment.apiUrl}/comments`, dto);
  }
}
