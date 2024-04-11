import { Component, Input, OnInit } from '@angular/core';
import { IonicModule, ModalController } from '@ionic/angular';
import { Place } from 'src/app/models/place.model';

@Component({
  selector: 'app-create-booking',
  templateUrl: './create-booking.component.html',
  standalone: true,
  imports: [
    IonicModule
  ]
})
export class CreateBookingComponent  implements OnInit {

  @Input({required: true}) place: Place;
  
  constructor(private modalCtrl: ModalController) { }

  ngOnInit() {}

  public onCancel(): void {
    this.modalCtrl.dismiss(null, 'cancel');
  }

  public onBookPlace(): void {
    this.modalCtrl.dismiss({message: 'Booked successfuly!'}, 'confirm');
  }

}
