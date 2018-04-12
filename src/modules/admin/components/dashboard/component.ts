import {Component}            from '@angular/core';
import {
    MatDialog,
    MatDialogConfig,
}                             from '@angular/material';
import {Organisation}         from '../../../../interfaces/Organisation';
import {AdminOrganisationApi} from '../../services/organisation-api';
import {EditOrganisation}     from '../../../organisation/components/edit/component';

@Component({
               selector:   'admin-dashboard',
               templateUrl:'component.html',
               styleUrls:  ['component.scss'],
           })
export class AdminDashboard {

    constructor(private Dialog: MatDialog, private OrganisationApi: AdminOrganisationApi) {
    }

    public edit() {

        let config = new MatDialogConfig;

        config.disableClose = true;

        let dialogRef = this.Dialog.open(EditOrganisation, config);

        dialogRef.afterClosed()
            .subscribe((Organisation: Organisation) => {
                !!Organisation.organisationId && this.OrganisationApi.save(Organisation);
            });
    }

}
