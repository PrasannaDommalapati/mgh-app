import {Component}            from '@angular/core';
import {AdminOrganisationApi} from '../../../admin/services/organisation-api';

@Component({
               selector:   'organisation-list',
               templateUrl:'./component.html',
               styleUrls:  ['./component.scss'],
           })
export class OrganisationList {

    public Organisations: any;


    public displayedColumns = [
        'name',
        'email',
        'notes',
    ];

    constructor(protected OrganisationApi: AdminOrganisationApi) {

    }

    ngOnInit() {

        this.OrganisationApi.list()
            .then(organisations => this.Organisations = organisations);

    }
}