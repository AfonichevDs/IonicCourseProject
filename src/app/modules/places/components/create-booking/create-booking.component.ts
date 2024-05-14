import { CommonModule } from '@angular/common';
import { Component, Input, OnInit } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
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
    dateFrom: new FormControl(null, {
      updateOn: 'blur',
      validators: [Validators.required]
    }),
    dateTo: new FormControl(null, {
      updateOn: 'blur',
      validators: [Validators.required]
    })
  });;

  constructor(private modalCtrl: ModalController) { }

  ngOnInit() {}

  public onCancel(): void {
    this.modalCtrl.dismiss(null, 'cancel');
  }

  public onBookPlace(): void {
    this.modalCtrl.dismiss({ message: 'Booked successfuly!' }, 'confirm');
  }

}
