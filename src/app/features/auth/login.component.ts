import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { AuthService } from '../../core/services/auth.service';

@Component({
  standalone: true,
  selector: 'tt-login',
  imports: [CommonModule, FormsModule, RouterLink],
  template: `
    <h2>Login</h2>
    <form (ngSubmit)="onSubmit()">
      <label>Username <input [(ngModel)]="username" name="u" required></label>
      <label>Password <input [(ngModel)]="password" name="p" type="password" required></label>
      <button>Login</button>
      <p>New here? <a routerLink="/register">Register</a></p>
    </form>
  `
})
export class LoginComponent {
  username=''; password='';
  constructor(private auth: AuthService, private router: Router){}
  onSubmit(){
    this.auth.login(this.username, this.password).subscribe(res => { this.auth.setSession(res); this.router.navigateByUrl('/'); });
  }
}
