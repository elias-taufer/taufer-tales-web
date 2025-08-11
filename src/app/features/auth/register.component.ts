import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../core/services/auth.service';

@Component({
  standalone: true,
  selector: 'tt-register',
  imports: [CommonModule, FormsModule],
  template: `
    <h2>Register</h2>
    <form (ngSubmit)="onSubmit()">
      <label>Username <input [(ngModel)]="username" name="u" required></label>
      <label>Email <input [(ngModel)]="email" name="e" type="email" required></label>
      <label>Password <input [(ngModel)]="password" name="p" type="password" required></label>
      <button>Register</button>
      <p *ngIf="msg" style="color: green;">{{msg}}</p>
    </form>
  `
})
export class RegisterComponent {
  username=''; email=''; password=''; msg='';
  constructor(private auth: AuthService, private router: Router){}
  onSubmit(){
    this.auth.register(this.username, this.email, this.password).subscribe({
      next: () => { this.msg = 'Registration successful. Please log in.'; this.router.navigateByUrl('/login'); },
      error: () => { this.msg = 'Registration failed.'; }
    });
  }
}
