import {Component, EventEmitter, Output} from '@angular/core';
import {MatDialog, MatDialogConfig} from '@angular/material';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {Router} from '@angular/router';
import {VerifyModal} from '../../verify/component';
import {UserService} from '../../../services/user-api';
import {Login} from '../../../../../interfaces/Login';

@Component({
               selector:    'user-login-form',
               templateUrl: 'component.html',
               styleUrls:   ['component.scss'],
           })
export class LoginForm {

    @Output() handleLogin = new EventEmitter<boolean>();

    public form: FormGroup;
    public loading: boolean = false;
    public error: string    = null;
    public forgotPass:boolean = false;

    constructor(public UserService: UserService,
                protected dialog: MatDialog,
                protected router: Router) {
    }

    ngOnInit() {

        this.form = (new FormBuilder).group(
            {
                email:       [null, [Validators.required]],
                password:    [null, [Validators.required]],
                acceptTerms: [null, [this.acceptTermsAndConditions]],
            });
    }

    private acceptTermsAndConditions(acceptTerms: FormControl) {

        return !!acceptTerms.value ? null : {
            acceptTermsInvalid: {
                error: 'You must accept Hotels.com terms and conditions.',
            },
        };
    }

    onSubmit() {

        let Login: Login = this.form.getRawValue();

        // start loading
        this.error   = null;
        this.loading = true;


        this.UserService
            .login(Login)
            .then(
                loggedIn => this.handleLogin.next(loggedIn),
                error => this.handleLoginError(error),
            );
    }

    public confirmRegistration(cognitoUser: any) {

        let config = new MatDialogConfig();

        config.disableClose = true;

        config.data = {username: cognitoUser.Username};

        let dialogRef = this.dialog.open(VerifyModal, config);

        dialogRef
            .afterClosed()
            .subscribe(() => this.onSubmit());
    }

    protected handleLoginError(error: any) {        // hide loading
        this.loading = false;
        this.forgotPass = false;

        // display error
        if (error.code == 'UserNotConfirmedException') {

            this.confirmRegistration(this.form.getRawValue());

            // open the confirmation modal
            // add ability to resend confirmation code within modal

        } else if(error.message === 'Incorrect username or password.') {

            this.forgotPass = true;
            this.error = error.message;

        } else {
            this.error = error.message;
        }
    }
}