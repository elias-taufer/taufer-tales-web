/*
 *  Copyright 2025 Elias Taufer
 *
 *   Licensed under the Apache License, Version 2.0 (the "License");
 *   you may not use this file except in compliance with the License.
 *   You may obtain a copy of the License at
 *
 *       http://www.apache.org/licenses/LICENSE-2.0
 *
 *   Unless required by applicable law or agreed to in writing, software
 *   distributed under the License is distributed on an "AS IS" BASIS,
 *   WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 *   See the License for the specific language governing permissions and
 *   limitations under the License.
 */

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
