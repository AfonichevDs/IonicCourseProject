import { Routes } from '@angular/router';

import { PlacesPage } from './places/places.page';

export const placesRoutes: Routes = [
    {
        path: 'tabs',
        component: PlacesPage,
        children: [
            {
                path: 'discover',
                children: [
                    {
                        path: '',
                        loadComponent: () => import('./places/discover/discover.page').then((m) => m.DiscoverPage)
                    },
                    {
                        path: ':placeId',
                        loadComponent: () => import('./places/discover/place-detail/place-detail.page').then((m) => m.PlaceDetailPage),
                    }
                ]
            },
            {
                path: 'offers',
                children: [
                    {
                        path: '',
                        loadComponent: () => import('./places/offers/offers.page').then((m) => m.OffersPage)
                    },
                    {
                        path: 'new-offer',
                        loadComponent: () => import('./places/offers/new-offer/new-offer.page').then((m) => m.NewOfferPage)
                    },
                    {
                        path: 'edit/:placeId',
                        loadComponent: () => import('./places/offers/edit-offer/edit-offer.page').then((m) => m.EditOfferPage)
                    },
                    {
                        path: ':placeId',
                        loadComponent: () => import('./places/offers/offer-bookings/offer-bookings.page').then((m) => m.OfferBookingsPage)
                    }
                ]
            }
        ]
    },
    {
        path: '',
        redirectTo: '/places/tabs/discover',
        pathMatch: 'full'
    }
];
