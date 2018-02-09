import {Component}   from '@angular/core';
import { Router } from '@angular/router';

@Component({
    selector:    'user-login',
    templateUrl: 'component.html',
    styleUrls:   ['component.scss']
})
export class Login {

    constructor(protected router: Router) {}

    public handleLogin(loggedIn:boolean){

        //method to handle after the login functionality
        this.router.navigate(['/']);
    }
}