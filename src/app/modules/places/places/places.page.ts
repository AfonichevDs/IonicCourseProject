import { Component, OnInit } from '@angular/core';
import { IonicModule } from '@ionic/angular';
import { addIcons } from 'ionicons';
import { card, search } from 'ionicons/icons';

@Component({
    selector: 'app-places',
    standalone: true,
    templateUrl: './places.page.html',
    styleUrls: ['./places.page.scss'],
    imports: [
        IonicModule
    ]
})
export class PlacesPage implements OnInit {
    constructor() {
        addIcons({ search, card });
    }

    ngOnInit() {
    }
}
