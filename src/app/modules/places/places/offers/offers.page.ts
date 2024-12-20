import { CurrencyPipe } from '@angular/common';
import {
    Component, DestroyRef, OnInit, signal, WritableSignal
} from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { Router, RouterLink } from '@angular/router';
import { IonicModule, IonItemSliding } from '@ionic/angular';
import { Offer } from 'src/app/models/offer.model';
import { OffersService } from 'src/app/services/offers/offers.service';

import { OfferItemComponent } from '../../components/offer-item/offer-item.component';

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
    public loadedOffers: WritableSignal<Offer[]> = signal([]);

    constructor(private offersService: OffersService, private router: Router, private destroyRef: DestroyRef) { }

    ngOnInit() {
        this.offersService.offers$.pipe(
            takeUntilDestroyed(this.destroyRef)
        ).subscribe((offers) => {
            this.loadedOffers.set(offers);
        });
    }

    public onEdit(offerId: string, itemSliding: IonItemSliding): void {
        itemSliding.close();
        this.router.navigate(['/places', 'tabs', 'offers', 'edit', offerId]);
    }
}
