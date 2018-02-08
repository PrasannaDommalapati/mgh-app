import {Component, ViewEncapsulation} from '@angular/core';
import {UserService} from '../modules/user/services/user-api';

@Component(
    {
        selector:      'hotels-app',
        templateUrl:   'component.html',
        styleUrls:     ['component.scss'],
        encapsulation: ViewEncapsulation.None,
    })
export class AppComponent {

    constructor(private UserService: UserService) {
    }

    ngOnInit() {

    }

    public userLoggedIn() {

        return this.UserService.isLoggedIn();
    }

    public inGroup(group: string) {

        return this.UserService.isInGroup(group);
    }
}