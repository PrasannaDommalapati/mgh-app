import {browser} from 'protractor';

export namespace NavigationActions {

    export function onPage(page: string) {

        return new Promise(resolve => browser
            .get(browser.baseUrl + '/' + page)
            .then(result => resolve(result)));
    }

    export function redirectedToPage(page: string) {

        return new Promise(resolve => browser.wait(browser.ExpectedConditions.urlIs(browser.baseUrl + '/' + page)).then(result => resolve(result)));
    }
}
