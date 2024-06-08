import { Component, DestroyRef, OnInit, WritableSignal, signal } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { ActivatedRoute } from '@angular/router';
import {
    ActionSheetController,
    IonicModule,
    LoadingController,
    ModalController,
    NavController,
} from '@ionic/angular';
import { filter } from 'rxjs';
import { Place } from 'src/app/models/place.model';
import { PlacesService } from 'src/app/services/places/places.service';

import { CreateBookingComponent } from '../../../components/create-booking/create-booking.component';
import { BookingsService } from 'src/app/services/bookings/bookings.service';
import { AuthService } from 'src/app/services/auth/auth.service';

@Component({
    selector: 'app-place-detail',
    standalone: true,
    templateUrl: './place-detail.page.html',
    imports: [IonicModule],
})
export class PlaceDetailPage implements OnInit {
    place: Place;
    isBookable: WritableSignal<boolean> = signal(false);

    constructor(
        private navCtrl: NavController,
        private route: ActivatedRoute,
        private placesService: PlacesService,
        private modalCtrl: ModalController,
        private destroyRef: DestroyRef,
        private loadingCtrl: LoadingController,
        private authService: AuthService,
        private actionSheetCtrl: ActionSheetController,
        private bookingsService: BookingsService
    ) {}

    ngOnInit() {
        this.route.paramMap.subscribe((paramMap) => {
            if (!paramMap.has('placeId')) {
                this.navCtrl.navigateBack('/places/tabs/offers');
                return;
            }

            this.placesService
                .getPlace(paramMap.get('placeId')!)
                .pipe(
                    takeUntilDestroyed(this.destroyRef),
                    filter((data) => data !== null)
                )
                .subscribe((place) => {
                    this.place = place!;
                    this.isBookable.set(place?.userId !== this.authService.userId);
                });
        });
    }

    public onBookPlace(): void {
        this.actionSheetCtrl
            .create({
                header: 'Choose an action',
                buttons: [
                    {
                        text: 'Select Date',
                        handler: () => {
                            this.openBookingModal('select');
                        },
                    },
                    {
                        text: 'Random date',
                        handler: () => {
                            this.openBookingModal('random');
                        },
                    },
                    {
                        text: 'Cancel',
                        role: 'cancel',
                    },
                ],
            })
            .then((actionSheetEl) => {
                actionSheetEl.present();
            });
    }

    openBookingModal(mode: 'select' | 'random') {
        this.modalCtrl
            .create({
                component: CreateBookingComponent,
                componentProps: {
                    place: this.place,
                    mode,
                },
            })
            .then((modalEl) => {
                modalEl.present();
                return modalEl.onDidDismiss();
            })
            .then((resultData) => {
                const data = resultData.data.bookingData.data;

                if (resultData.role === 'confirm') {
                    this.loadingCtrl.create({ message: 'Booking place...' }).then((loadingEl) => {
                        loadingEl.present();
                        this.bookingsService
                            .addBooking(
                                this.place.id,
                                this.place.title,
                                this.place.imageUrl,
                                data.firstName,
                                data.lastName,
                                data.guestNumber,
                                new Date(data.dateFrom),
                                new Date(data.dateTo)
                            )
                            .subscribe(() => loadingEl.dismiss());
                    });
                }
            });
    }
}
