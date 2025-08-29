import {Component} from '@angular/core';
import { TranslatePipe } from '../../../core/i18n/translate.pipe';
import {CommonModule} from '@angular/common';
import {FormsModule} from '@angular/forms';
import {Router} from '@angular/router';
import {AuthService} from '../../../core/services/auth.service';

@Component({
  standalone: true,
  imports: [CommonModule, FormsModule, TranslatePipe],
  templateUrl: './register.component.html'
})

export class RegisterComponent {
  username = '';
  privacyAccepted = false;
  password = '';
  confirmPassword = '';
  msg = '';

  constructor(private auth: AuthService, private router: Router) {
  }

  onSubmit() {
    if (this.password !== this.confirmPassword) { return; }
    if (!this.privacyAccepted) {
      this.msg = 'Bitte akzeptieren Sie die Datenschutzerklärung.';
      return;
    }
    this.auth.register(this.username, this.password, true).subscribe({
      next: () => {
        this.msg = 'Registration successful. Please log in.';
        this.router.navigateByUrl('/login');
      },
      error: () => {
        this.msg = 'Registration failed.';
      }
    });
  }
}
