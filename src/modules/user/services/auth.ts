import {Injectable} from '@angular/core';
import {CognitoUser, CognitoUserPool} from 'amazon-cognito-identity-js';

import * as AWS from 'aws-sdk';

import {environment} from '../../../app/constant/environment';
import * as jwtDecode from 'jwt-decode';

@Injectable()
export class AuthService {

    private CognitoUser: CognitoUser;

    private jwt: any;

    public getJwt() {
        return this.jwt;
    }

    public getAuthToken(): Promise<string> {
        return new Promise((resolve, reject) => {

            this.setCognitoUser();

            this.CognitoUser !== null &&
            this.CognitoUser
                .getSession((err: any, session: any) => {
                    if (err) {
                        reject(err);
                        return;
                    }
                    resolve(session.idToken.jwtToken);
                });
        });
    }

    public setCredentials(result: any) {

        return new Promise((resolve, reject) => {

            try {

                let logins = {};

                logins['cognito-idp.' + environment.cognito.region + '.amazonaws.com/' + environment.cognito.poolData.UserPoolId] = result.getIdToken().getJwtToken();

                AWS.config.credentials = new AWS.CognitoIdentityCredentials(
                    {
                        IdentityPoolId: environment.cognito.identityPoolId,
                        Logins:         logins,
                    });

                // stash the suff that we need to locally
                this.jwt = jwtDecode(result.getIdToken().getJwtToken());

                !!this.jwt && resolve(true) || reject();

            } catch (error) {

                reject(new Error(error));
            }
        });
    }

    public getCognitoUser() {

        return this.CognitoUser;
    }

    public setCognitoUser(username?: string): boolean {

        !!username && (username = username.toLowerCase());

        let userPool = new CognitoUserPool(environment.cognito.poolData);
        let userData = {
            Username: username,
            Pool:     userPool,
        };

        this.CognitoUser = !!username ? new CognitoUser(userData) : userPool.getCurrentUser();

        return !!this.CognitoUser;
    }

    public signOut() {

        this.jwt = null;
        !!this.CognitoUser && this.CognitoUser.signOut();
    }
}