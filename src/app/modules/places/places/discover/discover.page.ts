import { CommonModule, CurrencyPipe } from '@angular/common';
import { Component, DestroyRef, OnInit, WritableSignal, signal } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
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
    public loadedPlaces: WritableSignal<Place[]> = signal([]);
    constructor(private placesService: PlacesService, private menuCtrl: MenuController, private destroyRef: DestroyRef) { }

    ngOnInit() {

        this.placesService.places$.pipe(
            takeUntilDestroyed(this.destroyRef)
        ).subscribe((places) => {
            this.loadedPlaces.set(places);
        })
    }

    public onFilterUpdate(event: CustomEvent<SegmentChangeEventDetail>) {
        console.log(event.detail);
    }
}
