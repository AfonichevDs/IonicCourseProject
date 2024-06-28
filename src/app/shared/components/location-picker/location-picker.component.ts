import { CommonModule } from '@angular/common';
import {
    ChangeDetectionStrategy,
    Component,
    DestroyRef,
    EventEmitter,
    OnInit,
    Output,
    WritableSignal,
    model,
    signal,
} from '@angular/core';
import { RouterLink } from '@angular/router';
import {
    ActionSheetController,
    AlertController,
    IonicModule,
    ModalController,
} from '@ionic/angular';
import { MapModalComponent } from '../map-modal/map-modal.component';
import { GeoService } from 'src/app/services/geocoding/geo.service';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { map } from 'rxjs';
import { Coordinates, PlaceLocation } from 'src/app/models/location.model';
import { Capacitor } from '@capacitor/core';
import { Geolocation } from '@capacitor/geolocation';
import { GoogleMapsModule } from '@angular/google-maps';

@Component({
    selector: 'location-picker',
    templateUrl: './location-picker.component.html',
    styleUrl: './location-picker.component.scss',
    standalone: true,
    imports: [IonicModule, RouterLink, CommonModule, MapModalComponent, GoogleMapsModule],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LocationPickerComponent {
    @Output() locationPick = new EventEmitter<PlaceLocation>();

    selectedLocationImage: WritableSignal<string | null> = signal(null);
    isLoading: WritableSignal<boolean> = signal(false);

    constructor(
        private modalCtrl: ModalController,
        private geoService: GeoService,
        private destroyRef: DestroyRef,
        private actionSheetCtrl: ActionSheetController,
        private alertCtrl: AlertController
    ) {}

    pickLocation() {
        this.actionSheetCtrl
            .create({
                header: 'Please Choose',
                buttons: [
                    {
                        text: 'Auto-Locate',
                        handler: () => {
                            this.locateUser();
                        },
                    },
                    {
                        text: 'Pick on Map',
                        handler: () => {
                            this.openMap();
                        },
                    },
                    { text: 'Cancel', handler: () => {} },
                ],
            })
            .then((actionSheetEl) => {
                actionSheetEl.present();
            });
    }

    private locateUser() {
        if (!Capacitor.isPluginAvailable('Geolocation')) {
            this.showError();
            return;
        }

        this.isLoading.set(true);
        Geolocation.getCurrentPosition()
            .then((geoPosition) => {
                const coordinates: Coordinates = {
                    lat: geoPosition.coords.latitude,
                    lng: geoPosition.coords.longitude,
                };

                this.createPlace(coordinates);
            })
            .catch((err) => {
                this.showError();
                this.isLoading.set(false);
            });
    }

    private openMap() {
        this.modalCtrl
            .create({
                component: MapModalComponent,
            })
            .then((modalEl) => {
                modalEl.onDidDismiss<Coordinates>().then((modalData) => {
                    if (!modalData.data) {
                        return;
                    }
                    const coordinates: Coordinates = {
                        lat: modalData.data.lat,
                        lng: modalData.data.lng,
                    };

                    this.isLoading.set(true);
                    this.createPlace(coordinates);
                });
                modalEl.present();
            });
    }

    private createPlace(coordinates: Coordinates) {
        const pickedLocation: PlaceLocation = {
            lat: coordinates.lat,
            lng: coordinates.lng,
            address: null,
            staticMapImageUrl: null,
        };

        this.geoService
            .getAddress(coordinates.lat, coordinates.lng)
            .pipe(
                takeUntilDestroyed(this.destroyRef),
                map((address) => {
                    pickedLocation.address = address;
                    return this.geoService.getMapImage(coordinates, 14);
                })
            )
            .subscribe((imgUrl) => {
                this.isLoading.set(false);
                this.selectedLocationImage.set(imgUrl);
                pickedLocation.staticMapImageUrl = imgUrl;
                this.locationPick.emit(pickedLocation);
            });
    }

    private showError() {
        this.alertCtrl
            .create({
                header: 'Couldnt fetch location',
                message: 'Please use the map to pick a location',
                buttons: ['Okay']
            })
            .then((alertEl) => alertEl.present());
    }
}
