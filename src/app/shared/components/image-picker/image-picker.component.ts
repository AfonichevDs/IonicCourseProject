import { CommonModule } from '@angular/common';
import {
    ChangeDetectionStrategy,
    Component,
    ElementRef,
    EventEmitter,
    OnInit,
    Output,
    ViewChild,
    WritableSignal,
    isSignal,
    signal,
} from '@angular/core';
import { RouterLink } from '@angular/router';
import { IonicModule, Platform } from '@ionic/angular';
import { MapModalComponent } from '../map-modal/map-modal.component';
import { GoogleMapsModule } from '@angular/google-maps';
import { Capacitor } from '@capacitor/core';
import { Camera, CameraResultType, CameraSource } from '@capacitor/camera';

@Component({
    selector: 'image-picker',
    templateUrl: './image-picker.component.html',
    standalone: true,
    styleUrl: './image-picker.component.scss',
    imports: [IonicModule, RouterLink, CommonModule, MapModalComponent, GoogleMapsModule],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ImagePickerComponent implements OnInit {
    @Output() imagePick = new EventEmitter<string | File>();
    @ViewChild('filePicker') filePickerRef: ElementRef<HTMLInputElement>;

    selectedImage: WritableSignal<string | null> = signal(null);
    isLoading: WritableSignal<boolean> = signal(false);
    usePicker: WritableSignal<boolean> = signal(false);

    constructor(private platform: Platform) {}

    ngOnInit(): void {
        this.usePicker.set(
            (this.platform.is('mobile') && !this.platform.is('hybrid')) ||
                this.platform.is('desktop')
        );
    }

    public pickImage() {
        if (!Capacitor.isPluginAvailable('Camera') || this.usePicker()) {
            this.filePickerRef.nativeElement.click();
            return;
        }
        Camera.getPhoto({
            quality: 50,
            source: CameraSource.Prompt,
            correctOrientation: true,
            width: 600,
            resultType: CameraResultType.DataUrl,
        })
            .then((image) => {
                this.selectedImage.set(image.dataUrl!);
                this.imagePick.emit(this.selectedImage()!);
            })
            .catch((error) => {
                console.log(error);
                return false;
            });
    }

    public onFileChosen(event: Event) {
        const pickedFile = (event.target as HTMLInputElement).files![0];

        if (!pickedFile) {
            return;
        }

        const fileReader = new FileReader();
        fileReader.onload = () => {
            const dataUrl = fileReader.result?.toString();
            this.selectedImage.set(dataUrl!);
            this.imagePick.emit(pickedFile);
        };
        fileReader.readAsDataURL(pickedFile);
    }
}
