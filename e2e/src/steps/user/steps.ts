import {defineSupportCode} from 'cucumber';
import {browser} from 'protractor';
import {UserLoginPageObjects} from "../../../../src/modules/user/components/login/page-objects";

const Login = new UserLoginPageObjects;

defineSupportCode(({Given, When, Then}) => {

    Given(/^I am on the "([^"]*)" page$/, onPage);

    When(/^I log in as an "([^"]*)"$/, logInAs);

    Then(/^I will be redirected to the "([^"]*)" page$/, redirectedToPage);

    function onPage(page: string) {

        return browser.get(browser.baseUrl + '/' + page);
    }

    function logInAs(userType: string) {

        return Login.loginAs(userType);
    }

    function redirectedToPage(page: string) {

        return browser.wait(browser.ExpectedConditions.urlIs(browser.baseUrl + '/' + page));
    }
});