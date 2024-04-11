import { Injectable } from '@angular/core';
import { Place } from 'src/app/models/place.model';

@Injectable({
    providedIn: 'root'
})
export class PlacesService {
    private _places: Place[] = [
        new Place(
            'p1',
            'Hachijo Royal Resort',
            'With beatiful view at the Fukusima',
            'https://i.ytimg.com/vi/9F2heHgpl6M/maxresdefault.jpg',
            39.99
        ),
        new Place(
            'p2',
            'Sillent Hill Lakeview Hotel',
            'With beatiful view at the lake',
            'https://static.wikia.nocookie.net/silent/images/b/b7/Toluca_Lake_View_Hotel.jpg',
            79.99
        )
    ];

    get places() {
        return [...this._places];
    }

    public getPlace(id: string): Place {
        return {
            ...this._places.find(
                p => p.id === id
            )!
        };
    }

    constructor() {
    }
}
