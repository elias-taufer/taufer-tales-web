import { CanActivateFn, Router } from '@angular/router';

export const authGuard: CanActivateFn = () => {
  const has = !!localStorage.getItem('tt_token');
  if (!has) {
    const r = new Router();
    r.navigateByUrl('/login');
  }
  return has;
};
