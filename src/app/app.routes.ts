import {Routes} from '@angular/router';
import {authGuard} from './core/guards/auth.guard';

export const routes: Routes = [

  {
    path: 'tale/new',
    canActivate: [authGuard],
    loadComponent: () =>
      import('./features/tales/tale-form.component').then(m => m.TaleFormComponent)
  },

  {
    path: '', loadComponent: () =>
      import('./features/tales/tales-list.component').then(m => m.TalesListComponent)
  },

  {
    path: 'tale/:id',
    loadComponent: () =>
      import('./features/tales/tale-detail.component').then(m => m.TaleDetailComponent)
  },

  {
    path: 'login', loadComponent: () =>
      import('./features/auth/login.component').then(m => m.LoginComponent)
  },

  {
    path: 'register', loadComponent: () =>
      import('./features/auth/register.component').then(m => m.RegisterComponent)
  },

  {
    path: 'review/new/:taleId',
    canActivate: [authGuard],
    loadComponent: () =>
      import('./features/reviews/review-form.component').then(m => m.ReviewFormComponent)
  },

  {path: '**', redirectTo: ''}
];
