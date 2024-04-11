import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { IonicModule, NavController } from '@ionic/angular';
import { Place } from 'src/app/models/place.model';
import { PlacesService } from 'src/app/services/places/places.service';

@Component({
    selector: 'app-edit-offer',
    standalone: true,
    imports: [
        IonicModule
    ],
    templateUrl: './edit-offer.page.html'
})
export class EditOfferPage implements OnInit {

    place: Place;

    constructor(private navCtrl: NavController,
                private route: ActivatedRoute,
                private placesService: PlacesService) {}

    ngOnInit() {
        this.route.paramMap.subscribe(paramMap => {
            if (!paramMap.has('placeId')) {
                this.navCtrl.navigateBack('/places/tabs/offers');
                return;
            }
            this.place = this.placesService.getPlace(paramMap.get('placeId')!);
        });
    }

    public onChooseOffer(): void {
        this.navCtrl.navigateBack('/places/tabs/offers');
    }
}
