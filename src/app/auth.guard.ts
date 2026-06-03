import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from './auth.service';

export const authGuard: CanActivateFn = (route) => {
  const authService = inject(AuthService);
  const router = inject(Router);
  const isGuestOnlyRoute = route.data?.['guestOnly'] === true;

  if (isGuestOnlyRoute && authService.isAuthenticated()) {
    return router.createUrlTree(['/dashboard']);
  }

  if (!isGuestOnlyRoute && !authService.isAuthenticated()) {
    return router.createUrlTree(['/login']);
  }

  return true;
};