import { Component, OnInit } from '@angular/core';
import { IonicModule } from '@ionic/angular';

@Component({
    selector: 'app-bookings',
    standalone: true,
    imports: [
        IonicModule
    ],
    templateUrl: './bookings.page.html'
})
export class BookingsPage implements OnInit {
    constructor() { }

    ngOnInit() {
    }
}
