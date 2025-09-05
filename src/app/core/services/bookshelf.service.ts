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
import {HttpClient} from '@angular/common/http';
import {environment} from '../../../environments/environment';
import {BookshelfItem} from '../../shared/models/bookshelf.model';
import {ReadingStatus} from '../../shared/models/reading-status.enum';

@Injectable({providedIn: 'root'})
export class BookshelfService {
  private base = `${environment.apiUrl}`;

  constructor(private http: HttpClient) {
  }

  list(status?: ReadingStatus) {
    const params: any = {};
    if (status) params.status = status;
    return this.http.get<BookshelfItem[]>(`${this.base}/bookshelf`, {params});
  }

  myForTale(taleId: number) {
    return this.http.get<BookshelfItem>(`${this.base}/bookshelf/my`, {params: {taleId}});
  }

  setStatus(taleId: number, status: ReadingStatus) {
    return this.http.put<BookshelfItem>(`${this.base}/tales/${taleId}/status`, {status});
  }

  clearStatus(taleId: number) {
    return this.http.delete<void>(`${this.base}/tales/${taleId}/status`);
  }
}
