import {Component} from '@angular/core';
import {MatDialog, MatDialogConfig} from "@angular/material";
import {AdminOrganisationApi} from "../../services/organisation-api";
import {CreateOrganisation} from "../../../organisation/components/create/component";

@Component(
    {
        selector:    'admin-dashboard',
        templateUrl: 'component.html',
        styleUrls:   ['component.scss'],
    })
export class AdminDashboard {

    constructor(private Dialog:MatDialog,
    private OrganisationApi:AdminOrganisationApi) {}

    public edit() {

        let config = new MatDialogConfig;

        config.disableClose = true;

        this.Dialog.open(CreateOrganisation, config)
            .afterClosed()
            .subscribe(organisation => this.OrganisationApi.save(organisation));
    }



}
