import {defineSupportCode} from 'cucumber';
import {LoginActions} from '../actions/login';
import {browser} from "protractor";
import {AppPage} from "../pages/app";

defineSupportCode(({Given, When}) => {

    Given(/^I am logged in as "([^"]*)"$/, loggedInAs);

    Given(/^I am not logged in as "([^"]*)"$/, notLoggedInAs);

    When(/^I log in as a(?:n)? "([^"]*)"$/, loginAs);

    function loggedInAs(role: string) {

        const World = this;

        return loginAs.call(World, role);
    }

    function notLoggedInAs(role:string) {

        const World = this;

        return loginAs.call(World, `not-${role}`);


    }

    function loginAs(role: string) {

        const World = this;

        return LoginActions
            .loginAs(World, [role])
            .then(() => browser.wait(browser.ExpectedConditions.visibilityOf(AppPage.dashboard)));
    }

});
