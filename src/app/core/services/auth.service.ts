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

import {Injectable, signal} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {tap} from 'rxjs/operators';
import {environment, PRIVACY_POLICY_VERSION} from '../../../environments/environment';

type Session = { username: string; token: string };
type AuthResponse = { token: string; username: string };

@Injectable({providedIn: 'root'})
export class AuthService {
  private _user = signal<Session | null>(null);

  constructor(private http: HttpClient) {
    const token = localStorage.getItem('tt_token');
    const username = localStorage.getItem('tt_username');
    if (token && username) {
      this._user.set({username, token});
    }
  }

  user() {
    return this._user();
  }

  login(username: string, password: string) {
    return this.http.post<AuthResponse>(`${environment.apiUrl}/auth/login`, {username, password}).pipe(
      tap(res => {
        localStorage.setItem('tt_token', res.token);
        localStorage.setItem('tt_username', res.username);
        this._user.set({username: res.username, token: res.token});
      })
    );
  }

  register(username: string, password: string, privacyAccepted: boolean) {
    return this.http.post<void>(`${environment.apiUrl}/auth/register`, {
      username,
      password,
      privacyAccepted,
      privacyVersion: PRIVACY_POLICY_VERSION
    });
  }

  logout() {
    localStorage.removeItem('tt_token');
    localStorage.removeItem('tt_username');
    this._user.set(null);
  }
}
