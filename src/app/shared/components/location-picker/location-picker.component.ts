import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, DestroyRef, OnInit, WritableSignal, model, signal } from '@angular/core';
import { RouterLink } from '@angular/router';
import { IonicModule, ModalController } from '@ionic/angular';
import { MapModalComponent } from '../map-modal/map-modal.component';
import { GeoService } from 'src/app/services/geocoding/geo.service';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { map } from 'rxjs';
import { Coordinates, PlaceLocation } from 'src/app/models/location.model';

@Component({
    selector: 'location-picker',
    templateUrl: './location-picker.component.html',
    styleUrl: './location-picker.component.scss',
    standalone: true,
    imports: [IonicModule, RouterLink, CommonModule, MapModalComponent],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LocationPickerComponent {

    selectedLocationImage: WritableSignal<string | null> = signal(null);
    isLoading: WritableSignal<boolean> = signal(false);

    constructor(
        private modalCtrl: ModalController,
        private geoService: GeoService,
        private destroyRef: DestroyRef
    ) {}

    pickLocation() {
        this.modalCtrl
            .create({
                component: MapModalComponent,
            })
            .then((modalEl) => {
                modalEl.onDidDismiss<Coordinates>().then((modalData) => {
                    if (!modalData.data) {
                        return;
                    }
                    const pickedLocation: PlaceLocation = {
                        lat: modalData.data.lat,
                        lng: modalData.data.lng,
                        address: null,
                        staticMapImageUrl: null
                    };

                    this.isLoading.set(true);
                    this.geoService
                        .getAddress(modalData.data.lat, modalData.data.lng)
                        .pipe(
                            takeUntilDestroyed(this.destroyRef),
                            map((address) => {
                                pickedLocation.address = address;
                                return this.geoService.getMapImage(modalData.data!, 14);
                            })
                        )
                        .subscribe((imgUrl) => {
                            this.isLoading.set(false);
                            this.selectedLocationImage.set(imgUrl);
                        });
                });
                modalEl.present();
            });
    }
}
