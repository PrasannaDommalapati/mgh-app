import {by, element} from 'protractor';

export namespace LoginPage {

    export const emailInput = element(by.css('[formcontrolname="email"]'));
    export const passwordInput = element(by.css('[formcontrolname="password"]'));
    export const loginButton = element(by.css('[type="submit"]'));

}
