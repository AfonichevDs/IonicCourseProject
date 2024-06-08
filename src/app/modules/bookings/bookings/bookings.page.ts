import { Component, DestroyRef, OnInit } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { IonicModule, IonItemSliding, LoadingController } from '@ionic/angular';
import { Booking } from 'src/app/models/bookings.model';
import { BookingsService } from 'src/app/services/bookings/bookings.service';

@Component({
    selector: 'app-bookings',
    standalone: true,
    imports: [IonicModule],
    templateUrl: './bookings.page.html',
})
export class BookingsPage implements OnInit {
    loadedBookings: Booking[];

    constructor(
        private bookingsService: BookingsService,
        private loadingCtrl: LoadingController,
        private destroyRef: DestroyRef
    ) {}

    ngOnInit() {
        this.bookingsService.bookings
            .pipe(takeUntilDestroyed(this.destroyRef))
            .subscribe((bookings) => {
                this.loadedBookings = bookings;
            });
    }

    public onCancelBooking(bookingId: string, sligingItem: IonItemSliding) {
        sligingItem.close();
        this.loadingCtrl
            .create({
                message: 'Cancelling...',
            })
            .then((loadingEl) => {
                loadingEl.present();
                this.bookingsService
                    .cancelBooking(bookingId)
                    .pipe(takeUntilDestroyed(this.destroyRef))
                    .subscribe(() => loadingEl.dismiss());
            });
    }
}
