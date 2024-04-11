import { Component, OnInit } from '@angular/core';
import { IonicModule } from '@ionic/angular';
import { IonToolbar } from "@ionic/angular/standalone";

@Component({
    selector: 'app-new',
    standalone: true,
    imports: [
        IonicModule
    ],
    templateUrl: './new-offer.page.html',
})
export class NewOfferPage implements OnInit {
    constructor() { }

    ngOnInit() {
    }
}
