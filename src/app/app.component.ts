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

import {Component, inject} from '@angular/core';
import {CommonModule, NgOptimizedImage} from '@angular/common';
import { WelcomeModalComponent } from './features/welcome-modal/welcome-modal.component';
import { TranslatePipe } from './core/i18n/translate.pipe';
import { I18nService } from './core/i18n/i18n.service';
import {Router, RouterLink, RouterOutlet} from '@angular/router';
import {AuthService} from './core/services/auth.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, RouterOutlet, RouterLink, NgOptimizedImage, TranslatePipe, WelcomeModalComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent {
  showWelcome = false;

  ngOnInit() {
    try {
      if (!localStorage.getItem('tt_welcome_shown')) {
        this.showWelcome = true;
      }
    } catch {}
  }

  auth = inject(AuthService);
  i18n = inject(I18nService);
  private router = inject(Router);

  logout() {
    this.auth.logout();
    this.router.navigateByUrl('/');
  }

  onWelcomeClose() {
    try { localStorage.setItem('tt_welcome_shown','1'); } catch {}
    this.showWelcome = false;
  }

  changeLang(lang: 'en' | 'de') {
    this.i18n.setLanguage(lang);
  }
}
