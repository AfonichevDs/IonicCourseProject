import { Injectable } from '@angular/core';
import { Offer } from 'src/app/models/offer.model';
import { AuthService } from '../auth/auth.service';
import { BehaviorSubject } from 'rxjs';

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
    ])


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
        
        this._offers.next(this._offers.value.concat(newOffer));
    }
}
