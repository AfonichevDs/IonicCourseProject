import { CommonModule } from '@angular/common';
import { Component, DestroyRef, OnInit } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import {
    AbstractControl,
    FormControl,
    FormGroup,
    ReactiveFormsModule,
    Validators,
} from '@angular/forms';
import { Router } from '@angular/router';
import { IonicModule, LoadingController } from '@ionic/angular';
import { PlaceLocation } from 'src/app/models/location.model';
import { OffersService } from 'src/app/services/offers/offers.service';
import { DateTimeButtonComponent } from 'src/app/shared/components/date-time-button/date-time-button.component';
import { ImagePickerComponent } from 'src/app/shared/components/image-picker/image-picker.component';
import { LocationPickerComponent } from 'src/app/shared/components/location-picker/location-picker.component';
import { blobPrefix } from 'src/app/shared/constants/image.constants';

function base64toBlob(base64Data: string, contentType: string) {
    contentType = contentType || '';
    const sliceSize = 1024;
    const byteCharacters = atob(base64Data);
    const bytesLength = byteCharacters.length;
    const slicesCount = Math.ceil(bytesLength / sliceSize);
    const byteArrays = new Array(slicesCount);

    for (var sliceIndex = 0; sliceIndex < slicesCount; ++sliceIndex) {
        const begin = sliceIndex * sliceSize;
        const end = Math.min(begin + sliceSize, bytesLength);

        const bytes = new Array(end - begin);
        for (let offset = begin, i = 0; offset < end; ++i, ++offset) {
            bytes[i] = byteCharacters[offset].charCodeAt(0);
        }
        byteArrays[sliceIndex] = new Uint8Array(bytes);
    }
    return new Blob(byteArrays, { type: contentType });
}

@Component({
    selector: 'app-new',
    standalone: true,
    imports: [
        IonicModule,
        ReactiveFormsModule,
        CommonModule,
        DateTimeButtonComponent,
        LocationPickerComponent,
        ImagePickerComponent,
    ],
    templateUrl: './new-offer.page.html',
})
export class NewOfferPage implements OnInit {
    form: FormGroup;

    showCalendar: boolean;

    constructor(
        private readonly offersService: OffersService,
        private readonly router: Router,
        private loadingCtrl: LoadingController,
        private destroyRef: DestroyRef
    ) {}

    ngOnInit() {
        this.form = new FormGroup({
            title: new FormControl(null, {
                updateOn: 'blur',
                validators: [Validators.required],
            }),
            description: new FormControl(null, {
                updateOn: 'blur',
                validators: [Validators.required, Validators.maxLength(180)],
            }),
            price: new FormControl(null, {
                updateOn: 'blur',
                validators: [Validators.required, Validators.min(1)],
            }),
            dateFrom: new FormControl(null, {
                updateOn: 'blur',
                validators: [Validators.required],
            }),
            dateTo: new FormControl(null, {
                updateOn: 'blur',
                validators: [Validators.required],
            }),
            location: new FormControl(null, {
                updateOn: 'blur',
                validators: [Validators.required],
            }),
            image: new FormControl(null)
        });
    }

    onCreateOffer() {
        if (!this.form.valid) {
            return;
        }
        this.loadingCtrl
            .create({
                message: 'Creating offer...',
            })
            .then((loadingEl) => {
                loadingEl.present();
                this.offersService
                    .addOffer(
                        this.form.value.title,
                        this.form.value.description,
                        this.form.value.price,
                        new Date(this.form.value.dateFrom),
                        new Date(this.form.value.dateTo),
                        this.form.value.location
                    )
                    .pipe(takeUntilDestroyed(this.destroyRef))
                    .subscribe(() => {
                        loadingEl.dismiss();
                        this.form.reset();
                        this.router.navigate(['/places/tabs/offers']);
                    });
            });
    }

    openCalendar() {
        this.showCalendar = true;
    }
    cancelCalendar() {
        this.showCalendar = false;
    }

    dateFromChanged(value: any) {
        console.log(value);
    }

    onLocationPick(location: PlaceLocation) {
        this.form.patchValue({ location: location });
    }

    onImagePick(imageData: string | File) {
        let imageFile;
        if (typeof ImageData === 'string') {
            try {
                imageFile = base64toBlob(
                    (imageData as string).replace(blobPrefix, ''),
                    'image/jpeg'
                );
            } catch (error) {
                console.log(error);
            }
        } else {
            imageFile = imageData;
        }
        this.form.patchValue({image: imageFile});
    }

    get dateFromControl(): AbstractControl<any, any> | null {
        return this.form.get('dateFrom');
    }
}
