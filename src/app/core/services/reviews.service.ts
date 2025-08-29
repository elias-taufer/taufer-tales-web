import {inject, Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable, of, throwError} from 'rxjs';
import {catchError} from 'rxjs/operators';
import {environment} from '../../../environments/environment';

export interface Review {
  id: number;
  taleId: number;
  rating: number;
  title: string;
  body: string;
  username: string;
  createdAt?: string;
}

export interface ReviewCreate {
  taleId: number;
  rating: number;
  title: string;
  body: string;
}

@Injectable({providedIn: 'root'})
export class ReviewsService {
  private http = inject(HttpClient);
  private base = environment.apiUrl + '/reviews';

  getById(id: number) {
    return this.http.get<Review>(`${this.base}/${id}`);
  }

  forTale(taleId: number) {
    return this.http.get<Review[]>(`${this.base}/tale/${taleId}`);
  }

  myForTale(taleId: number): Observable<Review | null> {
    return this.http.get<Review>(`${this.base}/my`, {params: {taleId} as any}).pipe(
      catchError(err => {
        if (err.status === 404) return of(null);
        return throwError(() => err);
      })
    );
  }

  create(dto: ReviewCreate) {
    return this.http.post<Review>(this.base, dto);
  }

  update(id: number, dto: Omit<ReviewCreate, 'taleId'>) {
    return this.http.patch<Review>(`${this.base}/${id}`, dto);
  }

  delete(id: number) {
    return this.http.delete<void>(`${this.base}/${id}`);
  }
}
