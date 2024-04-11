import { Injectable } from '@angular/core';
import { Offer } from 'src/app/models/offer.model';

@Injectable({
    providedIn: 'root'
})
export class OffersService {
    private _offers: Offer[] = [
        new Offer(
            'p1',
            'Hachijo Royal Resort',
            'With beatiful view at the Fukusima',
            'https://i.ytimg.com/vi/9F2heHgpl6M/maxresdefault.jpg',
            39.99
        ),
        new Offer(
            'p2',
            'Sillent Hill Lakeview Hotel',
            'With beatiful view at the lake',
            'https://static.wikia.nocookie.net/silent/images/b/b7/Toluca_Lake_View_Hotel.jpg',
            79.99
        )
    ];

    get offers() {
        return [...this._offers];
    }

    constructor() {
    }
}
