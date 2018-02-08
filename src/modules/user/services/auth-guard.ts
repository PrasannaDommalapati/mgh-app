import {Injectable} from '@angular/core';
import {
    CanActivate, Router,
    ActivatedRouteSnapshot,
    RouterStateSnapshot,
} from '@angular/router';
import {MdDialog} from '@angular/material';
import {Observable} from 'rxjs';
import {UserService} from './user-api';
import {Subscriber} from 'rxjs/Subscriber';
import {LoginModal} from '../components/login/modal/component';

@Injectable()
export class AuthGuard implements CanActivate {

    constructor(private Router: Router,
                private UserService: UserService,
                public dialog: MdDialog) {
    }

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> | boolean {

        return new Observable(observer => {

            if (this.UserService.isLoggedIn()) {

                observer.next(true);

            } else {

                this.UserService.logInFromStorage()
                    .then(
                        () => observer.next(true),
                        () => this.loginModal(observer));
            }
        });

    }

    private loginModal(observer: Subscriber<boolean>) {

        // if not show login box
        let dialogRef = this.dialog.open(LoginModal);

        dialogRef.afterClosed()
                 .subscribe((loggedIn: boolean) => {

                     !loggedIn && this.Router.navigate(['/']);

                     observer.next(loggedIn);
                 });
    }
}