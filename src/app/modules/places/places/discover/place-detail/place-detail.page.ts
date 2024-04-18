import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ActionSheetController, IonicModule, ModalController, NavController } from '@ionic/angular';
import { Place } from 'src/app/models/place.model';
import { PlacesService } from 'src/app/services/places/places.service';
import { CreateBookingComponent } from '../../../components/create-booking/create-booking.component';

@Component({
    selector: 'app-place-detail',
    standalone: true,
    templateUrl: './place-detail.page.html',
    imports: [
        IonicModule
    ]
})
export class PlaceDetailPage implements OnInit {
    place: Place;

    constructor(private navCtrl: NavController,
        private route: ActivatedRoute,
        private placesService: PlacesService,
        private modalCtrl: ModalController,
        private actionSheetCtrl: ActionSheetController) { }

    ngOnInit() {
        this.route.paramMap.subscribe(paramMap => {
            if (!paramMap.has('placeId')) {
                this.navCtrl.navigateBack('/places/tabs/offers');
                return;
            }
            this.place = this.placesService.getPlace(paramMap.get('placeId')!);
        });
    }

    public onBookPlace(): void {
        this.actionSheetCtrl.create({
            header: 'Choose an action',
            buttons: [
                {
                    text: 'Select Date',
                    handler: () => {
                        this.openBookingModal('select');
                    }
                },
                {
                    text: 'Random date',
                    handler: () => {
                        this.openBookingModal('random');
                    }
                },
                {
                    text: 'Cancel',
                    role: 'cancel'
                }
            ]
        }).then(actionSheetEl => {
            actionSheetEl.present();
        });
    }

    openBookingModal(mode: 'select' | 'random') {
        this.modalCtrl.create({
            component: CreateBookingComponent,
            componentProps: {
                place: this.place
            }
        }).then(modalEl => {
            modalEl.present();
            return modalEl.onDidDismiss();
        })
        .then(resultData => {
            if(resultData.role === 'confirm') {
                alert(resultData.data.message);
            }
        });
    }
}
