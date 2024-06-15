import { enableProdMode, importProvidersFrom } from '@angular/core';
import { bootstrapApplication } from '@angular/platform-browser';
import {
    PreloadAllModules, provideRouter, RouteReuseStrategy, withPreloading
} from '@angular/router';
import { IonicModule, IonicRouteStrategy } from '@ionic/angular';

import { AppComponent } from './app/app.component';
import { routes } from './app/app.routes';
// import { AppModule } from './app/app.module';
import { environment } from './environments/environment';
import { provideHttpClient } from '@angular/common/http';

if (environment.production) {
    enableProdMode();
}

const providers = [
    provideRouter(routes, withPreloading(PreloadAllModules)),
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy },
    provideHttpClient(),
    importProvidersFrom(
        IonicModule.forRoot({})
    )
];

bootstrapApplication(AppComponent, { providers });
