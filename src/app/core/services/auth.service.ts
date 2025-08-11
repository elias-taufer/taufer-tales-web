import { Injectable, signal } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { tap } from 'rxjs/operators';

type Session = { username: string; token: string };
type AuthResponse = { token: string; username: string }; // match your backend

@Injectable({ providedIn: 'root' })
export class AuthService {
  // reactive session
  private _user = signal<Session | null>(null);

  constructor(private http: HttpClient) {
    // hydrate from storage on app start/refresh
    const token = localStorage.getItem('tt_token');
    const username = localStorage.getItem('tt_username');
    if (token && username) this._user.set({ username, token });
  }

  // ---- template helpers ----
  user() { return this._user(); }                 // returns Session | null
  username() { return this._user()?.username ?? null; }
  isAuthenticated() { return !!this._user(); }
  token() { return this._user()?.token ?? localStorage.getItem('tt_token'); }

  // ---- API calls ----
  login(username: string, password: string) {
    return this.http.post<AuthResponse>('/api/auth/login', { username, password }).pipe(
      tap(res => {
        localStorage.setItem('tt_token', res.token);
        localStorage.setItem('tt_username', res.username);
        this._user.set({ username: res.username, token: res.token });
      })
    );
  }

  // if your backend doesn’t return a token on register, remove the set() lines
  register(username: string, email: string, password: string) {
    return this.http.post<AuthResponse>('/api/auth/register', { username, email, password }).pipe(
      tap(res => {
        localStorage.setItem('tt_token', res.token);
        localStorage.setItem('tt_username', res.username);
        this._user.set({ username: res.username, token: res.token });
      })
    );
  }

  logout() {
    localStorage.removeItem('tt_token');
    localStorage.removeItem('tt_username');
    this._user.set(null);
  }
}
