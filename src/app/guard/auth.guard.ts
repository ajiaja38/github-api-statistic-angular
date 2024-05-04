import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';

export const authGuard: CanActivateFn = (route, state) => {
  const router: Router = inject(Router);

  const accesToken = localStorage.getItem('accessToken');
  const username = localStorage.getItem('username');

  const autenticated: boolean = accesToken && username ? true : false;

  if (!autenticated) {
    router.navigate(['/']);
    return false;
  }

  return true;
};
