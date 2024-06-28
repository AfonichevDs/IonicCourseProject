import { Component } from '@angular/core';
import { Router, RouterLinkWithHref } from '@angular/router';
import { IonicModule, Platform } from '@ionic/angular';
import { AuthService } from './services/auth/auth.service';
import { Capacitor } from '@capacitor/core';
import { SplashScreen } from '@capacitor/splash-screen';


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
        private platform: Platform,
        private authService: AuthService,
        private router: Router
    ) {}

    initApp() {
        this.platform.ready().then(() => {
            if(Capacitor.isPluginAvailable('SplashScreen')) {
                SplashScreen.hide();
            }
        })
    }

    onLogout() {
        this.authService.logout();
        this.router.navigate(['/auth']);
    }
}
