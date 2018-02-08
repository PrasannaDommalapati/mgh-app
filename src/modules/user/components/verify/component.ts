import {Component, Inject} from '@angular/core';
import {MdDialogRef, MD_DIALOG_DATA} from '@angular/material';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {UserService} from '../../services/user-api';
import {CognitoUser} from 'amazon-cognito-identity-js';

@Component(
    {
        selector:    'register-modal',
        templateUrl: 'component.html',
        styleUrls:   ['component.scss'],
    })
export class VerifyModal {

    public form: FormGroup;
    public loading: boolean = false;
    public error: string;

    constructor(public UserService: UserService,
                protected dialogRef: MdDialogRef<VerifyModal>,
                @Inject(MD_DIALOG_DATA) private CognitoUser: CognitoUser) {
    }

    ngOnInit() {

        this.form = (new FormBuilder).group(
            {
                code: [null, [Validators.required]],
            });
    }

    onSubmit() {

        let verify = this.form.getRawValue();

        // start loading
        this.loading = true;
        this.error   = null;

        this.UserService
            .confirmRegistration(this.CognitoUser, verify.code)
            .then(
                confirmed => this.dialogRef.close(confirmed),
                error => this.handleLoginError(error),
            );
    }

    protected handleLoginError(error: string) {

        // hide loading
        this.loading = false;

        // display error
        this.error = error;
    }
}