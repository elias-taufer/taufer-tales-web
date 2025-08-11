import { Injectable, signal } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { AuthResponse } from '../../shared/models';
import { environment } from '../../../environments/environment';

@Injectable({ providedIn: 'root' })
export class AuthService {
  private readonly TOKEN_KEY = 'tt_token';
  username = signal<string | null>(null);

  constructor(private http: HttpClient){
    const t = localStorage.getItem(this.TOKEN_KEY);
    if (t) this.username.set(this.parseJwt(t)?.sub ?? null);
  }

  login(username: string, password: string){
    return this.http.post<AuthResponse>(`${environment.apiUrl}/auth/login`, { username, password });
  }
  register(username: string, email: string, password: string){
    // tolerate 201 Created with empty body by requesting text response
    return this.http.post(`${environment.apiUrl}/auth/register`, { username, email, password }, { responseType: 'text' as 'json' });
  }

  setSession(res: AuthResponse){ localStorage.setItem(this.TOKEN_KEY, res.token); this.username.set(res.username); }
  logout(){ localStorage.removeItem(this.TOKEN_KEY); this.username.set(null); }
  token(){ return localStorage.getItem(this.TOKEN_KEY); }

  private parseJwt(token: string){ try { return JSON.parse(atob(token.split('.')[1])); } catch { return null; } }
}
