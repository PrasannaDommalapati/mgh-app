import {Component} from '@angular/core';
import {Router} from '@angular/router';
import {FormGroup} from '@angular/forms';

import {MatDialog, MatDialogConfig} from '@angular/material';
import {RegistrationFormFactory} from '../../../../factories/registration';
import {Register} from '../../../../interfaces/Register';
import {UserService} from '../../services/user-api';
import {VerifyModal} from '../verify/component';
import {CognitoUser, ISignUpResult} from 'amazon-cognito-identity-js';

@Component(
    {
        selector:    'user-register',
        templateUrl: 'component.html',
        styleUrls:   ['component.scss'],
    })
export class Registration {

    public form: FormGroup;
    public loading: boolean;
    public error: string;

    constructor(public UserService: UserService, protected dialog: MatDialog, protected router: Router) {
    }

    ngOnInit() {

        this.form = RegistrationFormFactory.form();
    }

    onSubmit() {

        let Register: Register = this.form.getRawValue();
        // start loading
        this.loading           = true;
        this.error             = null;

        this.UserService
            .register(Register)
            .then(
                (result:ISignUpResult) => this.confirmRegistration(result.user),
                error => this.handleError(error),
            );
    }

    confirmRegistration(CognitoUser: CognitoUser) {

        let config = new MatDialogConfig();

        config.disableClose = true;
        config.data = CognitoUser;

        let dialogRef = this.dialog.open(VerifyModal, config);

        dialogRef.afterClosed()
                 .subscribe(success => this.forwardToLogin());

    }

    forwardToLogin() {

        this.loading = false;

        this.router.navigate(['/login']);
    }

    handleError(error: string) {

        this.loading = false;

        this.error = error;
    }

}