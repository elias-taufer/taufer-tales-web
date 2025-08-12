import {CanActivateFn, Router} from '@angular/router';
import {inject} from '@angular/core';

export const authGuard: CanActivateFn = () => {
  const router = inject(Router);
  const has = !!localStorage.getItem('tt_token');
  return has ? true : router.parseUrl('/login');
};
