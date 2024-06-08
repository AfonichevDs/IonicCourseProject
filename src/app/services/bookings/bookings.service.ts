import { Injectable } from '@angular/core';
import { BehaviorSubject, delay, take, tap } from 'rxjs';
import { Booking } from 'src/app/models/bookings.model';
import { AuthService } from '../auth/auth.service';

@Injectable({
    providedIn: 'root',
})
export class BookingsService {
    constructor(private authService: AuthService) {}

    private _bookings = new BehaviorSubject<Booking[]>([]);

    get bookings() {
        return this._bookings.asObservable();
    }

    public addBooking(
        placeId: string,
        placeTitle: string,
        placeImage: string,
        firstName: string,
        lastName: string,
        guestNumber: number,
        dateFrom: Date,
        dateTo: Date
    ) {
        const newBooking = new Booking(
            Math.random().toString(),
            placeId,
            this.authService.userId,
            placeTitle,
            placeImage,
            firstName,
            lastName,
            guestNumber,
            dateFrom,
            dateTo
        );

        return this.bookings.pipe(
            take(1),
            delay(1200),
            tap((bookings) => this._bookings.next(bookings.concat(newBooking)))
        );
    }

    public cancelBooking(bookingId: string) {
        return this.bookings.pipe(
            take(1),
            delay(1200),
            tap((bookings) => this._bookings.next(bookings.filter(booking => booking.id !== bookingId)))
        );
    }
}
