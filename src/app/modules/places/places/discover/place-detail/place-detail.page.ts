import { Component, DestroyRef, OnInit } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { ActivatedRoute } from '@angular/router';
import {
    ActionSheetController, IonicModule, ModalController, NavController
} from '@ionic/angular';
import { filter } from 'rxjs';
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

    constructor(
        private navCtrl: NavController,
        private route: ActivatedRoute,
        private placesService: PlacesService,
        private modalCtrl: ModalController,
        private destroyRef: DestroyRef,
        private actionSheetCtrl: ActionSheetController
    ) { }

    ngOnInit() {
        this.route.paramMap.subscribe((paramMap) => {
            if (!paramMap.has('placeId')) {
                this.navCtrl.navigateBack('/places/tabs/offers');
                return;
            }

            this.placesService.getPlace(paramMap.get('placeId')!).pipe(
                takeUntilDestroyed(this.destroyRef),
                filter((data) => data !== null)
            ).subscribe((place) => {
                this.place = place!;
            });
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
        }).then((actionSheetEl) => {
            actionSheetEl.present();
        });
    }

    openBookingModal(mode: 'select' | 'random') {
        this.modalCtrl.create({
            component: CreateBookingComponent,
            componentProps: {
                place: this.place,
                mode
            }
        }).then((modalEl) => {
            modalEl.present();
            return modalEl.onDidDismiss();
        })
            .then((resultData) => {
                if (resultData.role === 'confirm') {
                    console.log(resultData.data);
                }
            });
    }
}
