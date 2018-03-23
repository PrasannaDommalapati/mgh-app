import {Component} from '@angular/core';
<<<<<<< HEAD
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
=======
import { DomSanitizer } from '@angular/platform-browser';

@Component(
    {
        selector: 'app-dashboard',
        templateUrl: 'component.html',
        styleUrls: ['component.scss'],
    })
export class Dashboard {


    public videoList: any = [
        {
            name: "video1",
            slug: "video1",
            embed: "6wD4V0rvlDI"
        },
        {
            name: "video2",
            slug: "video2",
            embed: "NFexAcg8PRw"
        },
        {
            name: "video3",
            slug: "video3",
            embed: "7iCDRJ1tD1I"
        },
        {
            name: "video4",
            slug: "video4",
            embed: "1FN2VZ2DWYI"
        },
        {
            name: "video5",
            slug: "video5",
            embed: "NFexAcg8PRw"
        }];

    public constructor(private sanitizer: DomSanitizer,) {
    }


    public getEmbedUrl(item: any) {

        return this.sanitizer.bypassSecurityTrustResourceUrl("https://www.youtube.com/embed/" + item.embed);
>>>>>>> a08ef9f175e29eda5ba4819e205ccd74acd73b6a
    }

}