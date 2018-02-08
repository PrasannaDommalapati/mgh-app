import {Component, EventEmitter, Output} from '@angular/core';
import {UserService} from '../../services/user-api';
import {MdDialog, MdDialogConfig} from '@angular/material';
import {ChangePasswordModal} from '../password/change/component';
import {ChangePassword} from '../../../../interfaces/change-password';

@Component(
    {
        selector:    'user-menu',
        templateUrl: './component.html',
        styleUrls:   ['./component.scss'],
    })
export class UserMenu {

    @Output() close = new EventEmitter();

    constructor(public dialog: MdDialog,
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

        let config = new MdDialogConfig;

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