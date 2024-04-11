import { CurrencyPipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';
import { IonicModule } from '@ionic/angular';
import { Offer } from 'src/app/models/offer.model';
import { OffersService } from 'src/app/services/offers/offers.service';

@Component({
    selector: 'app-offers',
    standalone: true,
    imports: [
        IonicModule,
        RouterLink,
        CurrencyPipe
    ],
    templateUrl: './offers.page.html'
})
export class OffersPage implements OnInit {
    public loadedOffers: Offer[];
    constructor(private offersService: OffersService) { }

    ngOnInit() {
        this.loadedOffers = this.offersService.offers;
    }
}
