import {Component, EventEmitter, Output} from '@angular/core';
import {MatDialog, MatDialogConfig} from '@angular/material';
import {UserService} from "../../../user/services/user-api";
import {ChangePasswordModal} from "../../../user/components/password/change/component";
import {ChangePassword} from "../../../../interfaces/change-password";

@Component(
    {
        selector:    'admin-menu',
        templateUrl: './component.html',
        styleUrls:   ['./component.scss'],
    })
export class AdminMenu {

    @Output() close = new EventEmitter();

    constructor(public dialog: MatDialog,
                private UserService: UserService) {
    }

    public profile() {

        alert('Profile page coming soon...');
    }

    public getUsername() {

        let UserAttributes = this.UserService.getUserAttributes();

        return !!UserAttributes && UserAttributes['given_name'] + ' ' + UserAttributes['family_name'] || null;
    }

    public loggedIn() {

        return this.UserService.isLoggedIn();
    }

    public logout() {

        this.UserService.isLoggedIn() && this.UserService.logout();
    }

    public changePassword() {

        let config = new MatDialogConfig;

        config.disableClose = true;
        config.data         = true;

        this.dialog
            .open(ChangePasswordModal, config)
            .afterClosed()
            .subscribe(
                (ChangePassword:ChangePassword) => {

                    this.UserService
                        .changePassword(ChangePassword)
                        .then(
                            result => {
                                alert('Password has been changed Successfully. Please click OK and continue.');
                                this.logout();
                            },
                            error => alert('Could not change password.'),
                        );
                },
            );
    }
}