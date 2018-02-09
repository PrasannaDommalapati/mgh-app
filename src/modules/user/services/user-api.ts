import {Injectable} from '@angular/core';

import {Login} from '../../../interfaces/Login';
import {AuthenticationDetails, CognitoUser, CognitoUserPool, CognitoUserSession} from 'amazon-cognito-identity-js';

import {environment} from '../../../app/constant/environment';
import {CognitoUserAttribute} from 'amazon-cognito-identity-js';
import {Register} from '../../../interfaces/Register';
import {AuthService} from './auth';
import {Router} from '@angular/router';
import {Organisation} from '../../../interfaces/Organisation';
import {RequestOptions} from '@angular/http';
import {Api} from '../../../app/services/api';
import {MatDialog, MatDialogConfig} from '@angular/material';
import {CompleteRegistrationModal} from '../components/password/complete-registration/component';
import {CompleteRegistration} from '../../../interfaces/complete-registration';
import {ChangePassword} from '../../../interfaces/change-password';

@Injectable()
export class UserService {

    private Organisation: Organisation;
    private UserAttributes = {};

    public constructor(private Api: Api,
                       private AuthService: AuthService,
                       public dialog: MatDialog,
                       private Router: Router) {
    }

    public login(Login: Login): Promise<boolean> {

        Login.email = Login.email.toLowerCase();

        return new Promise((resolve, reject) => {

            if (this.AuthService.setCognitoUser(Login.email)) {

                let authenticationDetails = new AuthenticationDetails(
                    {
                        Username: Login.email,
                        Password: Login.password,
                    });
                this.AuthService
                    .getCognitoUser()
                    .authenticateUser(
                        authenticationDetails,
                        {
                            newPasswordRequired: (userAttributes: any, requiredAttributes: any) => this.newPasswordRequired(userAttributes, requiredAttributes),
                            onSuccess:           (session: CognitoUserSession) => {

                                this
                                    .setSession(session)
                                    .then(
                                        () => resolve(),
                                        error => reject(error),
                                    );
                            },
                            onFailure:           error => reject(error),
                        });

                console.log(authenticationDetails);
            } else {
                reject('Could not set cognito user.');
            }
        });
    }

    public getUsername(): string {

        let CognitoUser = this.AuthService.getCognitoUser();

        return !!CognitoUser && CognitoUser.getUsername() || null;
    }

    public getOrganisation() {

        return this.Organisation;
    }

    public getUserAttributes() {

        return this.UserAttributes;
    }

    public register(Register: Register) {

        Register.email = Register.email.toLowerCase();

        return new Promise((resolve, reject) => {

            let userPool                               = new CognitoUserPool(environment.cognito.poolData);
            let userAttributes: CognitoUserAttribute[] = [];

            userAttributes.push(new CognitoUserAttribute(
                {
                    Name:  'email',
                    Value: Register.email,
                }));

            userAttributes.push(new CognitoUserAttribute(
                {
                    Name:  'given_name',
                    Value: Register.given_name,
                }));

            userAttributes.push(new CognitoUserAttribute(
                {
                    Name:  'family_name',
                    Value: Register.family_name,
                }));

            userPool
                .signUp(
                    Register.email,
                    Register.newPassword.password,
                    userAttributes,
                    null,
                    (error, result) => !error && resolve(result) || reject(error),
                );
        });
    }

    public confirmRegistration(CognitoUser: CognitoUser, verificationCode: string) {

        return new Promise((resolve, reject) => {

            if (this.AuthService.setCognitoUser(CognitoUser.getUsername())) {

                this.AuthService
                    .getCognitoUser()
                    .confirmRegistration(
                        verificationCode,
                        true,
                        (error, result) => !error && resolve(result) || reject(error),
                    );
            }
        });
    }

    public isLoggedIn(): boolean {

        return !!this.AuthService.getJwt();
    }

    public changePassword(ChangePassword: ChangePassword) {

        return new Promise((resolve, reject) => {

            let CognitoUser = this.AuthService.getCognitoUser();

            if (!!CognitoUser) {

                CognitoUser
                    .changePassword(
                        ChangePassword.oldPassword,
                        ChangePassword.newPassword.password,
                        (error, result) => !error && resolve(result) || reject(error),
                    );
            } else {
                reject();
            }

        });
    }

    public forgotPassword(email: string) {

        email = email.toLowerCase();

        return new Promise((resolve, reject) => {

            if (this.AuthService.setCognitoUser(email)) {

                this.AuthService
                    .getCognitoUser()
                    .forgotPassword(
                        {
                            onSuccess: () => resolve(),
                            onFailure: error => reject(error),
                        });
            } else {
                reject();
            }
        });

    }

    public resetPassword(verificationCode: string, newPassword: string) {

        return new Promise((resolve, reject) => {

            let CognitoUser = this.AuthService.getCognitoUser();

            if (!!CognitoUser) {

                CognitoUser
                    .confirmPassword(
                        verificationCode,
                        newPassword,
                        {
                            onSuccess: () => resolve(),
                            onFailure: error => reject(error),
                        });
            } else {
                reject();
            }
        });

    }

    public logout() {

        this.Organisation   = null;
        this.UserAttributes = null;

        this.AuthService.signOut();

        this.Router.navigate(['/login']);
    }

    public isInGroup(group: string) {

        let jwt = this.AuthService.getJwt();

        return !!jwt && !!jwt['cognito:groups'] && jwt['cognito:groups'].indexOf(group) !== -1;

    }

    public logInFromStorage() {

        return new Promise((resolve, reject) => {

            console.log(this.AuthService.setCognitoUser());

            if (this.AuthService.setCognitoUser()) {

                this.AuthService
                    .getCognitoUser()
                    .getSession((error: any, session: CognitoUserSession) => {
                                    if (!error && session.isValid()) {
                                        resolve(this.setSession(session));
                                    } else {
                                        reject(error);
                                    }
                                },
                    );
            } else {

                reject();
            }
        });
    }

    private newPasswordRequired(userAttributes: any, requiredAttributes: any) {

        console.log('userAttributes',userAttributes);
        console.log('requiredAttributes',requiredAttributes);

        delete userAttributes.email_verified;

        let config = new MatDialogConfig;

        config.disableClose = true;
        config.data         = requiredAttributes;

        this.dialog
            .open(CompleteRegistrationModal, config)
            .afterClosed()
            .subscribe(
                (CompleteRegistration: CompleteRegistration) => {

                    userAttributes['given_name']  = CompleteRegistration.given_name;
                    userAttributes['family_name'] = CompleteRegistration.family_name;

                    this.AuthService
                        .getCognitoUser()
                        .completeNewPasswordChallenge(
                            CompleteRegistration.newPassword.password,
                            userAttributes,
                            {
                                onSuccess: () => this.forwardToDashboard('Password has been changed Successfully. Please click OK and continue.'),
                                onFailure: () => this.forwardToLogin('Could not change password'),
                            },
                        );
                },
            );
    }

    private setSession(session: CognitoUserSession) {

        return this.AuthService
                   .setCredentials(session)
                   .then(() => this.setUserAttributes())
                   .then(() => this.setOrganisation());
    }

    private setOrganisation() {

        return new Promise((resolve, reject) => {

            try {

                let endpoint = environment.endpoint.user.organisations('me');
                let options  = new RequestOptions({method: 'GET'});

                this.Api
                    .request(endpoint, options)
                    .then(
                        (Organisation: Organisation) => resolve(this.Organisation = Organisation),
                        error => reject(error),
                    );

            } catch (error) {

                reject(error);
            }
        });

    }

    private setUserAttributes() {

        return new Promise((resolve, reject) => {

            try {

                let CognitoUser = this.AuthService.getCognitoUser();

                CognitoUser.getUserAttributes((Error: Error, UserAttributes: CognitoUserAttribute[]) => {

                    if (!Error) {

                        let attributes = {};

                        UserAttributes.map((value) => {

                            attributes[value['Name']] = value['Value'];
                        });

                        resolve(this.UserAttributes = attributes);

                    } else {

                        console.log('else',Error);

                        reject(Error);
                    }
                });

            } catch (error) {
                console.log('catch',Error);

                reject(error);
            }
        });
    }

    private forwardToDashboard(message?: string) {

        !!message && alert(message);

        this.Router.navigate(['/dashboard']);
    }

    private forwardToLogin(message?: string) {

        !!message && alert(message);

        this.Router.navigate(['/login']);

    }
}