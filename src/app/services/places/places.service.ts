import { Injectable } from '@angular/core';
import { Place } from 'src/app/models/place.model';
import { AuthService } from '../auth/auth.service';

@Injectable({
    providedIn: 'root'
})
export class PlacesService {

    constructor(private readonly authService: AuthService) {}

    private defaultImg = 'https://static.wikia.nocookie.net/silent/images/b/b7/Toluca_Lake_View_Hotel.jpg';

    private _places: Place[] = [
        new Place(
            'p1',
            'Hachijo Royal Resort',
            'With beatiful view at the Fukusima',
            'https://i.ytimg.com/vi/9F2heHgpl6M/maxresdefault.jpg',
            39.99,
            new Date('2024-01-01'),
            new Date('2024-12-31'),
            '1'
        ),
        new Place(
            'p2',
            'Sillent Hill Lakeview Hotel',
            'With beatiful view at the lake',
            'https://static.wikia.nocookie.net/silent/images/b/b7/Toluca_Lake_View_Hotel.jpg',
            79.99,
            new Date('2024-01-02'),
            new Date('2024-12-31'),
            '1'
        )
    ];

    get places() {
        return [...this._places]; //TO DO: try to look up to Signals
    }

    public getPlace(id: string): Place {
        return {
            ...this._places.find(
                p => p.id === id
            )!
        };
    }

    public addPlace(title: string, description: string, price: number, dateFrom: Date, dateTo: Date) {
        const newPlace = new Place(
            Math.random().toString(),
            title,
            description,
            this.defaultImg,
            price,
            dateFrom,
            dateTo,
            this.authService.userId
        );

        this.places.push(newPlace);
    }
}
