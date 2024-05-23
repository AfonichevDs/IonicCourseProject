import { CommonModule } from '@angular/common';
import { Component, OnInit, ViewChild } from '@angular/core';
import { AbstractControl, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { IonicModule } from '@ionic/angular';
import { OffersService } from 'src/app/services/offers/offers.service';
import { PlacesService } from 'src/app/services/places/places.service';
import { DateTimeButtonComponent } from 'src/app/shared/components/date-time-button/date-time-button.component';

@Component({
    selector: 'app-new',
    standalone: true,
    imports: [
        IonicModule,
        ReactiveFormsModule,
        CommonModule,
        DateTimeButtonComponent
    ],
    templateUrl: './new-offer.page.html',
})
export class NewOfferPage implements OnInit {
    form: FormGroup;

    showCalendar: boolean;

    constructor(private readonly offersService: OffersService,
        private readonly router: Router
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

        this.offersService.addOffer(
            this.form.value.title,
            this.form.value.description,
            this.form.value.price,
            new Date(this.form.value.dateFrom),
            new Date(this.form.value.dateTo)
        );
        this.form.reset();
        this.router.navigate(['/places/tabs/offers']);
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
