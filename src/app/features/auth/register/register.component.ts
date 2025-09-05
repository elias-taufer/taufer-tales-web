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
