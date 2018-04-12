import {Component}            from '@angular/core';
import {
    MatDialog,
    MatDialogConfig,
}                             from '@angular/material';
import {BehaviorSubject}      from 'rxjs/BehaviorSubject';
import {Organisation}         from '../../../../interfaces/Organisation';
import {AdminOrganisationApi} from '../../../admin/services/organisation-api';
import {EditOrganisation}   from '../edit/component';

@Component({
               selector:   'organisation-list',
               templateUrl:'./component.html',
               styleUrls:  ['./component.scss'],
           })
export class OrganisationList {

    private _Organisations: BehaviorSubject<Organisation[]> = new BehaviorSubject([]);

    public Organisations: Organisation[];

    constructor(private Dialog: MatDialog, protected OrganisationApi: AdminOrganisationApi) {

    }

    ngOnInit() {
        this._Organisations.subscribe(items => this.Organisations = items);

        this.load();

    }

    protected load() {

        this.OrganisationApi
            .list()
            .then((items: Organisation[]) => {

                this._Organisations.next(items);
            });
    }

    public edit(organisationId: string) {

        let config = new MatDialogConfig;

        config.disableClose = true;

        config.data = organisationId;

        let dialogRef = this.Dialog.open(EditOrganisation, config);

        dialogRef
            .afterClosed()
            .subscribe((Organisation: Organisation) => {

                console.log('organisation',Organisation)
                this.OrganisationApi
                    .save(Organisation)
                    .then(() => this.load());
            });
    }

    public remove(organisationId: string) {

        confirm('Are you sure you want to delete an organisation?') && this.OrganisationApi
            .remove(organisationId)
            .then(() => this.load());

    }
}