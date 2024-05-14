import { Injectable } from '@angular/core';

@Injectable({
    providedIn: 'root'
})
export class AuthService {
    private isAuthenticated = true;

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
}
