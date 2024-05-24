import { Injectable } from '@angular/core';
import {
    BehaviorSubject, debounceTime, delay, map, Observable, take, tap
} from 'rxjs';
import { Offer } from 'src/app/models/offer.model';

import { AuthService } from '../auth/auth.service';

@Injectable({
    providedIn: 'root'
})
export class OffersService {
    private defaultImg = 'https://static.wikia.nocookie.net/silent/images/b/b7/Toluca_Lake_View_Hotel.jpg';

    private _offers: BehaviorSubject<Offer[]> = new BehaviorSubject([
        new Offer(
            'p1',
            'Hachijo Royal Resort',
            'With beatiful view at the Fukusima',
            'https://i.ytimg.com/vi/9F2heHgpl6M/maxresdefault.jpg',
            39.99,
            new Date('2024-01-01'),
            new Date('2024-12-31'),
            '1'
        ),
        new Offer(
            'p2',
            'Sillent Hill Lakeview Hotel',
            'With beatiful view at the lake',
            'https://static.wikia.nocookie.net/silent/images/b/b7/Toluca_Lake_View_Hotel.jpg',
            79.99,
            new Date('2024-01-02'),
            new Date('2024-12-31'),
            '1'
        )
    ]);

    public getOffer(id: string): Observable<Offer | null> {
        return this._offers.pipe(
            take(1),
            map((offers) => offers.find((p) => p.id === id) ?? null)
        );
    }

    get offers$() {
        return this._offers.asObservable();
    }

    constructor(private readonly authService: AuthService) {
    }

    public addOffer(title: string, description: string, price: number, dateFrom: Date, dateTo: Date) {
        const newOffer = new Offer(
            Math.random().toString(),
            title,
            description,
            this.defaultImg,
            price,
            dateFrom,
            dateTo,
            this.authService.userId
        );

        return this._offers.pipe(
            debounceTime(1500),
            tap((data) => {
                this._offers.next(data.concat(newOffer));
            })
        );
    }

    public updateOffer(placeId: string, title: string, description: string) {
        return this.offers$.pipe(
            take(1),
            delay(1500),
            tap((offers) => {
                const updatedOfferIndex = offers.findIndex((o) => o.id === placeId);
                const updatedOffers = [...offers];

                const old = updatedOffers[updatedOfferIndex];

                const updatedOffer = { ...old };
                updatedOffer.title = title;
                updatedOffer.description = description;

                updatedOffers[updatedOfferIndex] = updatedOffer;

                this._offers.next(updatedOffers);
            })
        );
    }
}
