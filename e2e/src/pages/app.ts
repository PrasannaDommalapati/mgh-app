import {by, element} from 'protractor';

export namespace AppPage {

    export const dashboard       = element(by.tagName('dashboard'));
    export const menuIcon        = element(by.css('header mat-toolbar mat-icon'));
    export const logoutButton    = element(by.css('.sidenav-link.logout'));
}
