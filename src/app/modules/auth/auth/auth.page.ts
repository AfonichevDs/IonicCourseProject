import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, OnInit, WritableSignal, signal } from '@angular/core';
import { FormControl, FormGroup, FormsModule, NgForm, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { IonicModule, LoadingController } from '@ionic/angular';
import { AuthService } from 'src/app/services/auth/auth.service';

@Component({
    selector: 'app-auth',
    templateUrl: './auth.page.html',
    standalone: true,
    styleUrls: ['./auth.page.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
    imports: [
        IonicModule,
        FormsModule,
        CommonModule,
        ReactiveFormsModule
    ]
})
export class AuthPage implements OnInit {

    isLogin: WritableSignal<boolean> = signal(true);

    authForm = new FormGroup({
        email: new FormControl<string>('', [Validators.required, Validators.email]),
        password: new FormControl<string>('', [Validators.required, Validators.minLength(7)]),
    });

    get emailCtrl() {
        return this.authForm.controls.email;
    }

    get passwordCtrl() {
        return this.authForm.controls.password;
    }

    constructor(private authService: AuthService, private router: Router, private loadingCtrl: LoadingController) { }

    ngOnInit() {
    }

    onLogin() {
        console.log(this.authForm.value);
        this.authService.login();
        this.loadingCtrl.create({
            keyboardClose: true,
            message: 'Logging in...'
        }).then(loadingEl => {
            loadingEl.present();
            setTimeout(() => {
                loadingEl.dismiss();
                this.router.navigate(['/places', 'tabs', 'discover']);
            }, 1500);
        });
    }

    onSubmit(form: NgForm) {
        if(!form.valid) {
            return;
        }
        
        const email = this.emailCtrl.value;
        const password = this.passwordCtrl.value;

        if(this.isLogin()) {
            //send login request
        }
        else {

        }
    }

    public switchAuthMode() {
        this.isLogin.set(!this.isLogin());
    }
}
