import { Component, OnInit } from '@angular/core';
import { IonItemSliding, IonicModule } from '@ionic/angular';
import { Booking } from 'src/app/models/bookings.model';
import { BookingsService } from 'src/app/services/bookings/bookings.service';

@Component({
    selector: 'app-bookings',
    standalone: true,
    imports: [
        IonicModule
    ],
    templateUrl: './bookings.page.html'
})
export class BookingsPage implements OnInit {
    loadedBookings: Booking[];

    constructor(private bookingsService: BookingsService) { }

    ngOnInit() {
        this.loadedBookings = this.bookingsService.bookings;
    }

    public onCancelBooking(booking: string, sligingItem: IonItemSliding) {
        sligingItem.close();
        //close booking
    }
}
