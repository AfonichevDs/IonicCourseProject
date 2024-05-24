import { CommonModule } from '@angular/common';
import { Component, Input, OnInit } from '@angular/core';
import {
    AbstractControl, FormControl, FormGroup, ReactiveFormsModule, Validators
} from '@angular/forms';
import { IonicModule, ModalController } from '@ionic/angular';
import { Place } from 'src/app/models/place.model';

@Component({
    selector: 'app-create-booking',
    templateUrl: './create-booking.component.html',
    standalone: true,
    imports: [
        IonicModule,
        CommonModule,
        ReactiveFormsModule
    ]
})
export class CreateBookingComponent implements OnInit {
    @Input({ required: true }) place: Place;
    @Input() mode: 'select' | 'random';

    dateRangeValidator(group: AbstractControl): { [key: string]: any } | null {
        const fromDate = group.get('dateFrom')?.value;
        const toDate = group.get('dateTo')?.value;

        return fromDate && toDate && fromDate > toDate ? { dateRangeInvalid: true } : null;
    }

    form = new FormGroup({
        firstName: new FormControl(null, {
            updateOn: 'blur',
            validators: [Validators.required]
        }),
        lastName: new FormControl(null, {
            updateOn: 'blur',
            validators: [Validators.required, Validators.maxLength(180)]
        }),
        guestNumber: new FormControl(2, {
            updateOn: 'blur',
            validators: [Validators.required, Validators.min(1)]
        }),
        dateFrom: new FormControl<string | null>(null, {
            updateOn: 'blur',
            validators: [Validators.required]
        }),
        dateTo: new FormControl<string | null>(null, {
            updateOn: 'blur',
            validators: [Validators.required]
        })
    }, { validators: [this.dateRangeValidator] });

    startDate: string;
    endDate: string;

    constructor(private modalCtrl: ModalController) { }

    ngOnInit() {
        const availableFrom = new Date(this.place.availableFrom);
        const availableTo = new Date(this.place.availableTo);
        if (this.mode === 'random') {
            this.startDate = new Date(availableFrom.getTime() + Math.random() * (availableTo.getTime() - 7 * 24 * 60 * 60 * 1000 - availableFrom.getTime())).toISOString();

            this.endDate = new Date(new Date(this.startDate).getTime() + Math.random() * (new Date(this.startDate).getTime() + 6 * 24 * 60 * 60 * 1000 - new Date(this.startDate).getTime())).toISOString();

            this.dateFromControl.setValue(this.startDate);
            this.dateToControl.setValue(this.endDate);
        }
    }

    public onCancel(): void {
        this.modalCtrl.dismiss(null, 'cancel');
    }

    public onBookPlace(): void {
        if (!this.form.valid) {
            return;
        }

        this.modalCtrl.dismiss({
            bookingData: {
                data: this.form.value
            }
        }, 'confirm');
    }

    get dateFromControl() {
        return this.form.controls.dateFrom;
    }

    get dateToControl() {
        return this.form.controls.dateTo;
    }
}
