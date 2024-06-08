import { CommonModule } from "@angular/common";
import { ChangeDetectionStrategy, Component } from "@angular/core";
import { RouterLink } from "@angular/router";
import { IonicModule, ModalController } from "@ionic/angular";
import { GoogleMapsModule } from '@angular/google-maps'

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

    options: google.maps.MapOptions = {
        center: {lat: 50.5, lng: 30.22},
        zoom: 16
      };

    constructor(private modalCtrl: ModalController) {

    }

    cancel() {
        this.modalCtrl.dismiss();
    }
}