import { CurrencyPipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { IonItemSliding, IonicModule } from '@ionic/angular';
import { Offer } from 'src/app/models/offer.model';
import { OffersService } from 'src/app/services/offers/offers.service';
import { OfferItemComponent } from "../../components/offer-item/offer-item.component";

@Component({
    selector: 'app-offers',
    standalone: true,
    templateUrl: './offers.page.html',
    imports: [
        IonicModule,
        RouterLink,
        CurrencyPipe,
        OfferItemComponent
    ]
})
export class OffersPage implements OnInit {
    public loadedOffers: Offer[];
    constructor(private offersService: OffersService, private router: Router) { }

    ngOnInit() {
        this.loadedOffers = this.offersService.offers;
    }

    public onEdit(offerId:string, itemSliding: IonItemSliding): void {
        itemSliding.close();
        this.router.navigate(['/places', 'tabs', 'offers', 'edit', offerId]);
    }
}
