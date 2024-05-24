import { DatePipe } from '@angular/common';
import { Component, Input, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';
import { IonicModule } from '@ionic/angular';
import { Offer } from 'src/app/models/offer.model';

@Component({
    selector: 'app-offer-item',
    templateUrl: './offer-item.component.html',
    styleUrls: ['./offer-item.component.scss'],
    standalone: true,
    imports: [
        IonicModule,
        RouterLink,
        DatePipe
    ]
})
export class OfferItemComponent implements OnInit {
    @Input({ required: true }) public offer: Offer;

    ngOnInit(): void {
    }

    getDate() {
        return new Date();
    }
}
