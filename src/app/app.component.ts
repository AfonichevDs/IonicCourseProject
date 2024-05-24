import { Component } from '@angular/core';
import { Router, RouterLinkWithHref } from '@angular/router';
import { IonicModule } from '@ionic/angular';

import { AuthService } from './services/auth/auth.service';

@Component({
    selector: 'app-root',
    standalone: true,
    templateUrl: 'app.component.html',
    imports: [
        IonicModule,
        RouterLinkWithHref
    ]
})
export class AppComponent {
    constructor(
        private authService: AuthService,
        private router: Router
    ) {}

    onLogout() {
        this.authService.logout();
        this.router.navigate(['/auth']);
    }
}
