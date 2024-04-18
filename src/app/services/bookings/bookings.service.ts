import { Injectable } from "@angular/core";
import { Booking } from "src/app/models/bookings.model";

@Injectable({
    providedIn: 'root'
})
export class BookingsService {
    private _bookings: Booking[] = [
        {
            id: 'xyz',
            placeId: 'p2',
            userId: 'abc',
            placeTitle: 'Sillent Hill Lakeview Hotel',
            guestNumber: 2,
        }
    ];

    get bookings() {
        return [...this._bookings];
    }
}