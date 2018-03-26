import {Component} from '@angular/core';
import {UserService} from '../../../modules/user/services/user-api';

@Component(
    {
        selector:    'app-dashboard',
        templateUrl: 'component.html',
        styleUrls:   ['component.scss'],
    })
export class Dashboard {

    public constructor(private UserService: UserService) {
    }

    public inGroup(group: string) {

        return this.UserService.isInGroup(group);
    }



}
