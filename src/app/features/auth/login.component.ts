import {Component} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormsModule} from '@angular/forms';
import {Router, RouterLink} from '@angular/router';
import {AuthService} from '../../core/services/auth.service';

@Component({
  standalone: true,
  imports: [CommonModule, FormsModule, RouterLink],
  template: `
    <div class="vstack" style="gap:12px; max-width:520px;">
      <h2 style="margin:0;">Login</h2>
      <form class="card vstack" style="gap:8px;" (ngSubmit)="onSubmit()">
        <div class="form-field">
          <label>Username</label>
          <input class="input" [(ngModel)]="username" name="u" required>
        </div>
        <div class="form-field">
          <label>Password</label>
          <input class="input" [(ngModel)]="password" name="p" type="password" required>
        </div>
        <div class="hstack" style="justify-content:space-between;">
          <a class="btn btn-ghost" routerLink="/register">Create account</a>
          <button class="btn btn-primary" type="submit">Login</button>
        </div>
      </form>
    </div>
  `
})
export class LoginComponent {
  username = '';
  password = '';

  constructor(private auth: AuthService, private router: Router) {
  }

  onSubmit() {
    this.auth.login(this.username, this.password).subscribe({
      next: () => this.router.navigateByUrl('/'),
      error: () => {
      }
    });
  }
}
