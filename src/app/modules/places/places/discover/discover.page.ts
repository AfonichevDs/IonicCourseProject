import { CommonModule, CurrencyPipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';
import { IonicModule, MenuController, SegmentChangeEventDetail } from '@ionic/angular';
import { Place } from 'src/app/models/place.model';
import { PlacesService } from 'src/app/services/places/places.service';

@Component({
    selector: 'app-discover',
    standalone: true,
    imports: [
        IonicModule,
        CurrencyPipe,
        CommonModule,
        RouterLink
    ],
    templateUrl: './discover.page.html',
    styleUrls: ['./discover.page.scss'],
})
export class DiscoverPage implements OnInit {
    public loadedPlaces: Place[];
    constructor(private placesService: PlacesService, private menuCtrl: MenuController) { }

    ngOnInit() {
        this.loadedPlaces = this.placesService.places;
    }

    public onFilterUpdate(event: CustomEvent<SegmentChangeEventDetail>) {
        console.log(event.detail);
    }
}
