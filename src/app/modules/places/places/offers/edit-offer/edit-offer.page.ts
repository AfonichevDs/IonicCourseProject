import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, DestroyRef, OnInit } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { IonicModule, NavController } from '@ionic/angular';
import { filter } from 'rxjs';
import { Place } from 'src/app/models/place.model';
import { PlacesService } from 'src/app/services/places/places.service';

@Component({
    selector: 'app-edit-offer',
    standalone: true,
    imports: [
        IonicModule,
        ReactiveFormsModule,
        CommonModule
    ],
    changeDetection: ChangeDetectionStrategy.OnPush,
    templateUrl: './edit-offer.page.html'
})
export class EditOfferPage implements OnInit {

    place: Place;
    form: FormGroup;

    constructor(private navCtrl: NavController,
        private route: ActivatedRoute,
        private destroyRef: DestroyRef,
        private placesService: PlacesService) { }

    ngOnInit() {
        this.route.paramMap.subscribe(paramMap => {
            if (!paramMap.has('placeId')) {
                this.navCtrl.navigateBack('/places/tabs/offers');
                return;
            }

            this.placesService.getPlace(paramMap.get('placeId')!).pipe(
                takeUntilDestroyed(this.destroyRef),
                filter(data => data !== null)
            ).subscribe(place => {
                this.place = place!;
                this.form = new FormGroup({
                    title: new FormControl(this.place.title, {
                        updateOn: 'blur',
                        validators: [Validators.required]
                    }),
                    description: new FormControl(this.place.description, {
                        updateOn: 'blur',
                        validators: [Validators.required, Validators.maxLength(180)]
                    })
                });
            });

        });
    }

    public onChooseOffer(): void {
        this.navCtrl.navigateBack('/places/tabs/offers');
    }

    public onEditOffer(): void {

    }
}
