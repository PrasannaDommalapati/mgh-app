import {Injectable}       from '@angular/core';
import {
    CanActivate, Router,
    ActivatedRouteSnapshot,
    RouterStateSnapshot
}                           from '@angular/router';
import {MdDialog} from "@angular/material";
import {Observable} from "rxjs";
import {UserService} from "./user-api";

@Injectable()
export class GuestGuard implements CanActivate {

    constructor(private Router: Router, private UserService: UserService, public dialog: MdDialog) {
    }

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> | boolean {

        if (!this.UserService.isLoggedIn()) {

            return true;

        } else {

            this.Router.navigate(['/dashboard']);
        }
    }
}