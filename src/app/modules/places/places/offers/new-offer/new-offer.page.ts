import { CommonModule } from '@angular/common';
import {
    Component, DestroyRef, OnInit
} from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import {
    AbstractControl, FormControl, FormGroup, ReactiveFormsModule, Validators
} from '@angular/forms';
import { Router } from '@angular/router';
import { IonicModule, LoadingController } from '@ionic/angular';
import { OffersService } from 'src/app/services/offers/offers.service';
import { DateTimeButtonComponent } from 'src/app/shared/components/date-time-button/date-time-button.component';
import { LocationPickerComponent } from 'src/app/shared/components/location-picker/location-picker.component';

@Component({
    selector: 'app-new',
    standalone: true,
    imports: [
        IonicModule,
        ReactiveFormsModule,
        CommonModule,
        DateTimeButtonComponent,
        LocationPickerComponent
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
    ) { }

    ngOnInit() {
        this.form = new FormGroup({
            title: new FormControl(null, {
                updateOn: 'blur',
                validators: [Validators.required]
            }),
            description: new FormControl(null, {
                updateOn: 'blur',
                validators: [Validators.required, Validators.maxLength(180)]
            }),
            price: new FormControl(null, {
                updateOn: 'blur',
                validators: [Validators.required, Validators.min(1)]
            }),
            dateFrom: new FormControl(null, {
                updateOn: 'blur',
                validators: [Validators.required]
            }),
            dateTo: new FormControl(null, {
                updateOn: 'blur',
                validators: [Validators.required]
            })
        });
    }

    onCreateOffer() {
        if (!this.form.valid) {
            return;
        }
        this.loadingCtrl.create({
            message: 'Creating offer...'
        }).then((loadingEl) => {
            loadingEl.present();
            this.offersService.addOffer(
                this.form.value.title,
                this.form.value.description,
                this.form.value.price,
                new Date(this.form.value.dateFrom),
                new Date(this.form.value.dateTo)
            ).pipe(takeUntilDestroyed(this.destroyRef)).subscribe(() => {
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

    get dateFromControl(): AbstractControl<any, any> | null {
        return this.form.get('dateFrom');
    }
}
