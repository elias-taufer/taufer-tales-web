import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';          // ← gives you *ngIf
import { RouterOutlet, RouterLink } from '@angular/router';
import { AuthService } from './core/services/auth.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, RouterOutlet, RouterLink],     // ← include CommonModule
  templateUrl: './app.html',
  styleUrl: './app.scss',
})
export class App {
  auth = inject(AuthService);                            // ← exposed to template
  logout() { this.auth.logout(); }                       // ← used by (click)
}
