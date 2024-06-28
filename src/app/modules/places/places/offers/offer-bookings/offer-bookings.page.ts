import { Component, DestroyRef, OnInit } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { IonicModule, NavController } from '@ionic/angular';
import { filter } from 'rxjs';
import { Offer } from 'src/app/models/offer.model';
import { Place } from 'src/app/models/place.model';
import { OffersService } from 'src/app/services/offers/offers.service';
import { PlacesService } from 'src/app/services/places/places.service';

@Component({
    selector: 'app-offer-bookings',
    templateUrl: './offer-bookings.page.html',
    standalone: true,
    imports: [IonicModule, RouterLink],
})
export class OfferBookingsPage implements OnInit {
    offer: Offer;

    constructor(
        private route: ActivatedRoute,
        private navCtrl: NavController,
        private placesService: OffersService,
        private destroyRef: DestroyRef
    ) {}

    ngOnInit() {
        this.route.paramMap.subscribe((paramMap) => {
            if (!paramMap.has('placeId')) {
                this.navCtrl.navigateBack('/places/tabs/offers');
                return;
            }

            this.placesService
                .getOffer(paramMap.get('placeId')!)
                .pipe(
                    takeUntilDestroyed(this.destroyRef),
                    filter((data) => data !== null)
                )
                .subscribe((offer) => {
                    this.offer = offer!;
                });
        });
    }
}
