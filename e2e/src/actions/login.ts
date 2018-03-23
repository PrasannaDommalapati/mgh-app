import {LoginPage} from "../pages/login";
import {ApiConfig} from "../interfaces/api/config";
import {MockApi} from "../helpers/mock-api";
import {World} from "cucumber";
import {NavigationActions} from "./navigation";

import * as faker from 'faker';

export namespace LoginActions {


    import emailInput = LoginPage.emailInput;
    import passwordInput = LoginPage.passwordInput;
    import loginButton = LoginPage.loginButton;

    export function loginAs(World: World, roles: string[]): Promise<any> {

        const Api = new MockApi();

        const userEmail = faker.internet.email();
        const userPassword = faker.internet.password();

        let ApiConfig: ApiConfig = {
            Request: {
                method: 'POST',
                path: '/json/v2/Login'
            },
            Response: {
                roles: roles,
                body: {
                    data: faker.random.number(),
                    status: true,
                    message: faker.lorem.sentence()
                }
            }
        };

        World.roles = roles;

        return Promise.resolve()
            .then(() => NavigationActions.onPage('logout'))
            .then(() => Api.setupEndpoints(World.MockServerClient, [ApiConfig]))
            .then(() => new Promise((resolve) => emailInput.sendKeys(userEmail).then(() => resolve())))
            .then(() => new Promise((resolve) => passwordInput.sendKeys(userPassword).then(() => resolve())))
            .then(() => new Promise((resolve) => loginButton.click().then(() => resolve())));
    }
}
