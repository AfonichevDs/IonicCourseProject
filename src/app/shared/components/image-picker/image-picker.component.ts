import { CommonModule } from "@angular/common";
import { ChangeDetectionStrategy, Component, OnInit, WritableSignal, signal } from "@angular/core";
import { RouterLink } from "@angular/router";
import { IonicModule } from "@ionic/angular";
import { MapModalComponent } from "../map-modal/map-modal.component";
import { GoogleMapsModule } from "@angular/google-maps";

@Component({
    selector: 'image-picker',
    templateUrl: './image-picker.component.html',
    standalone: true,
    imports: [IonicModule, RouterLink, CommonModule, MapModalComponent, GoogleMapsModule],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ImagePickerComponent implements OnInit {
    selectedImage: WritableSignal<string | null> = signal(null);
    isLoading: WritableSignal<boolean> = signal(false);
    
    ngOnInit(): void {
        throw new Error("Method not implemented.");
    }

    public pickImage() {

    }
}