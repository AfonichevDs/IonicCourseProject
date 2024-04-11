import { Injectable, inject } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivateFn,Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from '../services/auth/auth.service';

export const authGuard: CanActivateFn = (
  route: ActivatedRouteSnapshot,
  state: RouterStateSnapshot
) => {
  const authService = inject(AuthService);
  const router = inject(Router);

  if(!authService.userIsAuthenticated) {
    router.navigate(['/auth']);
  }

  return true;
};
