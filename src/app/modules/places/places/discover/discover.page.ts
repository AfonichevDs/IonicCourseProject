import { CommonModule, CurrencyPipe } from '@angular/common';
import { Component, DestroyRef, OnInit, signal, WritableSignal } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { RouterLink } from '@angular/router';
import { IonicModule, SegmentChangeEventDetail } from '@ionic/angular';
import { Place } from 'src/app/models/place.model';
import { AuthService } from 'src/app/services/auth/auth.service';
import { PlacesService } from 'src/app/services/places/places.service';

@Component({
    selector: 'app-discover',
    standalone: true,
    imports: [IonicModule, CurrencyPipe, CommonModule, RouterLink],
    templateUrl: './discover.page.html',
    styleUrls: ['./discover.page.scss'],
})
export class DiscoverPage implements OnInit {
    public loadedPlaces: WritableSignal<Place[]> = signal([]);
    public relevantPlaces: WritableSignal<Place[]> = signal([]);

    constructor(
        private placesService: PlacesService,
        private authService: AuthService,
        private destroyRef: DestroyRef
    ) {}

    ngOnInit() {
        this.placesService.places$.pipe(takeUntilDestroyed(this.destroyRef)).subscribe((places) => {
            this.loadedPlaces.set(places);
            this.relevantPlaces.set(this.loadedPlaces());
        });
    }

    public onFilterUpdate(event: CustomEvent<SegmentChangeEventDetail>) {
        if (event.detail.value === 'all') {
            this.relevantPlaces.set(this.loadedPlaces());
        } else {
            this.relevantPlaces.set(this.loadedPlaces().filter(
                (place) => place.userId !== this.authService.userId));
        }
        console.log(this.relevantPlaces());
    }
}
