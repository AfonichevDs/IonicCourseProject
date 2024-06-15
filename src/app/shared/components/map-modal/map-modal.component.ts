import { CommonModule } from "@angular/common";
import { ChangeDetectionStrategy, Component } from "@angular/core";
import { RouterLink } from "@angular/router";
import { IonicModule, ModalController } from "@ionic/angular";
import { GoogleMapsModule } from '@angular/google-maps'
export import GoogleMap = google.maps;

@Component({
    selector: 'map-modal',
    templateUrl: './map-modal.component.html',
    styleUrls: [ './map-modal.component.scss'],
    standalone: true,
    imports: [
        IonicModule,
        RouterLink,
        CommonModule,
        GoogleMapsModule
    ],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class MapModalComponent {

    options: GoogleMap.MapOptions = {
        center: {lat: 50.53, lng: 30.22},
        zoom: 14
      };

    constructor(private modalCtrl: ModalController) {

    }

    cancel() {
        this.modalCtrl.dismiss();
    }

    onMapClick(event: GoogleMap.MapMouseEvent) {
        const coordinates = {
            lat: event.latLng?.lat(),
            lng: event.latLng?.lng()
        }
        console.log(event.latLng?.lat());
        console.log(event.latLng?.lng());

        this.modalCtrl.dismiss(coordinates);
    }
}