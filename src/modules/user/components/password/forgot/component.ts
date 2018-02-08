import {Component} from '@angular/core';
import {Router} from '@angular/router';
import {FormGroup} from '@angular/forms';

import {MdDialog, MdDialogConfig} from '@angular/material';
import {UserService} from '../../../services/user-api';
import {PasswordForgotFormFactory} from '../../../../../factories/password/forgot';
import {ResetPasswordModal} from '../reset/component';

@Component(
    {
        selector:    'user-password-forgot',
        templateUrl: 'component.html',
        styleUrls:   ['component.scss'],
    })
export class ForgotPasswordModal {

    public form: FormGroup;
    public loading: boolean;
    public error: string;

    constructor(public UserService: UserService,
                protected dialog: MdDialog,
                protected router: Router) {
    }

    ngOnInit() {

        this.form = PasswordForgotFormFactory.form();
    }

    onSubmit() {

        this.loading = true;

        this.UserService
            .forgotPassword(this.form.getRawValue().email)
            .then(
                result => this.setNewPassword(),
                error => this.handleError(error),
            );
    }

    backToLogin() {

        this.router.navigate(['/login']);
    }

    setNewPassword() {

        let config = new MdDialogConfig;

        config.disableClose = true;

        this.dialog.open(ResetPasswordModal, config).afterClosed()
            .subscribe(
                success => this.backToLogin(),
                error => this.handleError(error),
            );
    }

    handleError(error: string) {

        this.loading = false;
        this.error   = error;

        alert(error)
    }
}