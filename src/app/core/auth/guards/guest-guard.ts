import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';

export const guestGuard: CanActivateFn = (route, state) => {
  if (localStorage.getItem('accessToken')) return inject(Router).parseUrl('/feed');
  return true;
};
