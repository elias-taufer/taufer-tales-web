import {Injectable} from '@angular/core';
import {HttpClient, HttpParams} from '@angular/common/http';
import { HttpHeaders } from '@angular/common/http';
import {environment} from '../../../environments/environment';
import {Page, Tale, TaleCreate} from '../../shared/models/tale.model';

@Injectable({providedIn: 'root'})
export class TalesService {
  constructor(private http: HttpClient) {}

  list(q = '', page = 0, size = 50) {
    return this.http.get<Page<Tale>>(`${environment.apiUrl}/tales`, {params: {q, page, size}});
  }

  get(id: number) {
    return this.http.get<Tale>(`${environment.apiUrl}/tales/${id}`);
  }


  create(dto: TaleCreate) {
    return this.http.post<Tale>(`${environment.apiUrl}/tales`, dto);
  }


  update(id: number, dto: TaleCreate) {
    return this.http.patch<Tale>(`${environment.apiUrl}/tales/${id}`, dto);
  }

  importByIsbn(isbn: string) {
    const params = new HttpParams().set('isbn', isbn.trim());
    return this.http.post<Tale>(`${environment.apiUrl}/tales/import`, null, { params });
  }
}
