import { CommonModule } from "@angular/common";
import { ChangeDetectionStrategy, Component, OnInit, model } from "@angular/core";
import { RouterLink } from "@angular/router";
import { IonicModule, ModalController } from "@ionic/angular";
import { MapModalComponent } from "../map-modal/map-modal.component";

@Component({
    selector: 'location-picker',
    templateUrl: './location-picker.component.html',
    standalone: true,
    imports: [
        IonicModule,
        RouterLink,
        CommonModule,
        MapModalComponent
    ],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class LocationPickerComponent {

    constructor(private modalCtrl: ModalController) {

    }

    pickLocation() {
        this.modalCtrl.create({
            component: MapModalComponent
        }).then(modalEl => {
            modalEl.present();
        })
    }
}