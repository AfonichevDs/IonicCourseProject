import { Routes } from '@angular/router';

export const bookingRoutes: Routes = [
    {
        path: '',
        loadComponent: () => import('./bookings/bookings.page').then((m) => m.BookingsPage)
    }
];
