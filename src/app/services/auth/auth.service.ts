import { Injectable } from '@angular/core';

@Injectable({
    providedIn: 'root'
})
export class AuthService {
    private isAuthenticated = true;
    private _userId = '1';

    get userIsAuthenticated() {
        return this.isAuthenticated;
    }

    constructor() {}

    login() {
        this.isAuthenticated = true;
    }

    logout() {
        this.isAuthenticated = false;
    }

    get userId() {
        return this._userId;
    }
}
