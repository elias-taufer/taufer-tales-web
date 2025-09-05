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

import {Routes} from '@angular/router';
import {authGuard} from './core/guards/auth.guard';

export const routes: Routes = [
  {
    path: 'datenschutz',
    loadComponent: () => import('./features/legal/privacy-policy.component').then(m => m.PrivacyPolicyComponent),
  },

  {
    path: 'impressum',
    loadComponent: () =>
      import('./features/legal/impressum.component').then(m => m.ImpressumComponent),
  },

  {
    path: '',
    pathMatch: 'full',
    loadComponent: () =>
      import('./features/tales/tales-list/tales-list.component').then(m => m.TalesListComponent),
  },
  {
    path: 'tale/new',
    canActivate: [authGuard],
    loadComponent: () =>
      import('./features/tales/tale-form/tale-form.component').then(m => m.TaleFormComponent),
  },
  {
    path: 'tale/:id',
    loadComponent: () =>
      import('./features/tales/tale-detail/tale-detail.component').then(m => m.TaleDetailComponent),
  },
  {
    path: 'review/new/:taleId',
    canActivate: [authGuard],
    loadComponent: () =>
      import('./features/reviews/review-form.component').then(m => m.ReviewFormComponent),
  },
  {
    path: 'review/edit/:id',
    canActivate: [authGuard],
    loadComponent: () =>
      import('./features/reviews/review-form.component').then(m => m.ReviewFormComponent),
  },
  {
    path: 'login',
    loadComponent: () =>
      import('./features/auth/login/login.component').then(m => m.LoginComponent),
  },
  {
    path: 'register',
    loadComponent: () =>
      import('./features/auth/register/register.component').then(m => m.RegisterComponent),
  },

  {
    path: 'my/books',
    canActivate: [authGuard],
    loadComponent: () =>
      import('./features/bookshelf/bookshelf.component').then(m => m.BookshelfComponent),
  },

  {
    path: 'tale/:id/edit',
    canActivate: [authGuard],
    loadComponent: () =>
      import('./features/tales/tale-form/tale-form.component').then(m => m.TaleFormComponent),
  },
  {path: '**', redirectTo: ''},
];
