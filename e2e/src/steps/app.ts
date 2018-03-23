import {defineSupportCode} from 'cucumber';
import {AppActions} from "../actions/app";
import {NavigationActions} from '../actions/navigation';

defineSupportCode(({Given, When, Then}) => {

    Given(/^I am on the "([^"]*)" page$/, onPage);

    When(/^I open the menu$/, openMenu);
    When(/^I click on the logout button$/, clickLogout);
    When(/^I navigate to the "([^"]*)" page$/, onPage);

    Then(/^I will be redirected to the "([^"]*)" page$/, redirectedToPage);


    function onPage(page: string) {

        return NavigationActions.onPage(page);
    }

    function redirectedToPage(page: string) {

        return NavigationActions.redirectedToPage(page);
    }

    function openMenu() {

        return AppActions.openMenu();
    }

    function clickLogout() {

        return AppActions.clickLogout();
    }

});
