import { Routes } from '@angular/router';

export const authRoutes: Routes = [
    {
        path: '',
        loadComponent: () => import('./auth/auth.page').then((m) => m.AuthPage)
    }
];
