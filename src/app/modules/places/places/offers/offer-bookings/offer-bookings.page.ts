import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { IonicModule, NavController } from '@ionic/angular';
import { Offer } from 'src/app/models/offer.model';
import { Place } from 'src/app/models/place.model';
import { PlacesService } from 'src/app/services/places/places.service';

@Component({
    selector: 'app-offer-bookings',
    templateUrl: './offer-bookings.page.html',
    standalone: true,
    imports: [
        IonicModule,
        RouterLink
    ]
})
export class OfferBookingsPage implements OnInit {

    place: Place;

    constructor(private route: ActivatedRoute,
        private navCtrl: NavController,
        private placesService: PlacesService
    ) { }

    ngOnInit() {
        this.route.paramMap.subscribe(paramMap => {
            if(!paramMap.has('placeId')) {
                this.navCtrl.navigateBack('/places/tabs/offers');
                return;
            }
            this.place = this.placesService.getPlace(paramMap.get('placeId')!);
        });
    }
}
