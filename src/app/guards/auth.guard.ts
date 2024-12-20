import { inject } from '@angular/core';
import {
    ActivatedRouteSnapshot, CanActivateFn, Router, RouterStateSnapshot
} from '@angular/router';

import { AuthService } from '../services/auth/auth.service';

export const authGuard: CanActivateFn = (
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
) => {
    const authService = inject(AuthService);
    const router = inject(Router);

    if (!authService.userIsAuthenticated) {
        router.navigate(['/auth']);
    }

    return true;
};
