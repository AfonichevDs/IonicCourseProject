import { Routes } from '@angular/router';
import { authGuard } from './guards/auth.guard';

export const routes: Routes = [
    {
        path: 'places',
        loadChildren: () => import('./modules/places/places.routing').then((m) => m.placesRoutes),
        canActivate: [authGuard]
    },
    {
        path: 'bookings',
        loadChildren: () => import('./modules/bookings/bookings.routing').then((m) => m.bookingRoutes),
        canActivate: [authGuard]
    },
    {
        path: 'auth',
        loadChildren: () => import('./modules/auth/auth.routing').then((m) => m.authRoutes),
    },
    {
        path: '',
        redirectTo: '/places/tabs/discover',
        pathMatch: 'full'
    }
];
