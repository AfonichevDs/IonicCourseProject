import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, DestroyRef, OnInit } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { IonicModule, LoadingController, NavController } from '@ionic/angular';
import { filter } from 'rxjs';
import { Offer } from 'src/app/models/offer.model';
import { OffersService } from 'src/app/services/offers/offers.service';

@Component({
    selector: 'app-edit-offer',
    standalone: true,
    imports: [IonicModule, ReactiveFormsModule, CommonModule],
    changeDetection: ChangeDetectionStrategy.OnPush,
    templateUrl: './edit-offer.page.html',
})
export class EditOfferPage implements OnInit {
    offer: Offer;
    form: FormGroup;

    constructor(
        private navCtrl: NavController,
        private route: ActivatedRoute,
        private destroyRef: DestroyRef,
        private offersService: OffersService,
        private router: Router,
        private loadingCtrl: LoadingController
    ) {}

    ngOnInit() {
        this.route.paramMap.subscribe((paramMap) => {
            if (!paramMap.has('offerId')) {
                this.navCtrl.navigateBack('/places/tabs/offers');
                return;
            }

            this.offersService
                .getOffer(paramMap.get('offerId')!)
                .pipe(
                    takeUntilDestroyed(this.destroyRef),
                    filter((data) => data !== null)
                )
                .subscribe((offer) => {
                    this.offer = offer!;
                    this.form = new FormGroup({
                        title: new FormControl(this.offer.title, {
                            updateOn: 'blur',
                            validators: [Validators.required],
                        }),
                        description: new FormControl(this.offer.description, {
                            updateOn: 'blur',
                            validators: [Validators.required, Validators.maxLength(180)],
                        }),
                    });
                });
        });
    }

    public onChooseOffer(): void {
        this.navCtrl.navigateBack('/places/tabs/offers');
    }

    public onEditOffer(): void {
        if (this.form.invalid) {
            return;
        }

        this.loadingCtrl
            .create({
                message: 'Updating offer...',
            })
            .then((loadingEl) => {
                loadingEl.present();
                this.offersService
                    .updateOffer(
                        this.offer.id,
                        this.titleControl.value,
                        this.descriptionControl.value
                    )
                    .subscribe(() => {
                        loadingEl.dismiss();
                        this.form.reset();
                        this.router.navigate(['places/tabs/offers']);
                    });
            });
    }

    get titleControl() {
        return this.form.get('title')!;
    }

    get descriptionControl() {
        return this.form.get('description')!;
    }
}
