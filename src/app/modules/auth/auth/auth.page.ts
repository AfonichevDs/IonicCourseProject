import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { IonicModule, LoadingController } from '@ionic/angular';
import { AuthService } from 'src/app/services/auth/auth.service';

@Component({
    selector: 'app-auth',
    templateUrl: './auth.page.html',
    standalone: true,
    styleUrls: ['./auth.page.scss'],
    imports: [
        IonicModule
    ]
})
export class AuthPage implements OnInit {
    constructor(private authService: AuthService, private router: Router, private loadingCtrl: LoadingController) { }

    ngOnInit() {
    }

    onLogin() {
        this.authService.login();
        this.loadingCtrl.create({
            keyboardClose: true,
            message: 'Logging in...'
        }).then(loadingEl => {
            loadingEl.present();
            setTimeout(() =>{
                loadingEl.dismiss();
                this.router.navigate(['/places', 'tabs', 'discover']);
            }, 1500);
        });

    }
}
