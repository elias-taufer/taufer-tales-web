import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {environment} from '../../../environments/environment';
import {Review} from '../../shared/models';

@Injectable({providedIn: 'root'})
export class ReviewsService {
  constructor(private http: HttpClient) {
  }

  forTale(taleId: number) {
    return this.http.get<Review[]>(`${environment.apiUrl}/reviews/tale/${taleId}`);
  }

  create(dto: { taleId: number; rating: number; title?: string; body?: string }) {
    return this.http.post<Review>(`${environment.apiUrl}/reviews`, dto);
  }
}
