import {
    Component,
    Inject,
}                                from '@angular/core';
import {
    MatDialog,
    MatDialogConfig,
    MatDialogRef,
    MAT_DIALOG_DATA,
}                                from '@angular/material';
import {BehaviorSubject}         from 'rxjs/BehaviorSubject';
import {Organisation}            from '../../../../interfaces/Organisation';
import {AdminOrganisationApi}    from '../../../admin/services/organisation-api';
import {EditAddress}             from '../../../directives/address/edit/component';
import {FormGroup}               from '@angular/forms';
import {OrganisationFormFactory} from '../../../../factories/organisation';
import {Address}                 from '../../../../interfaces/Address';

@Component({
               selector:   'create-organisation',
               templateUrl:'component.html',
               styleUrls:  ['component.scss'],
           })
export class CreateOrganisation {

    public form: FormGroup;
    public organisationId: string;
    private _organisation: BehaviorSubject<Organisation> = new BehaviorSubject({
                                                                                   name:               null,
                                                                                   notes:              null,
                                                                                   address:            null,
                                                                                   carrierRegistration:null,
                                                                               });

    constructor(
        private Dialog: MatDialog,
        private OrganisationApi: AdminOrganisationApi,
        protected dialogRef: MatDialogRef<CreateOrganisation>,
        @Inject(MAT_DIALOG_DATA) public data: any,
    ) {
        this.form = OrganisationFormFactory.form();

    }

    ngOnInit() {

        this.organisationId = this.data;

        !!this.organisationId && this.set();

    }

    public set() {

        this.form.disable();
        this.OrganisationApi
            .get(this.organisationId)
            .then((Organisation: Organisation) => {

                console.log(Organisation)

                !!Organisation && Object.keys(Organisation).forEach(name => {
                    if (this.form.controls[name]) {
                        this.form.controls[name].patchValue(Organisation[name]);
                    }
                });

                this.form.enable();
            });
    }

    public editAddress() {

        let config = new MatDialogConfig;

        config.disableClose = false;
        config.data         = {
            contactDetails:true,
        };
        let dialogRef       = this.Dialog.open(EditAddress, config);

        dialogRef.afterClosed().subscribe((result: Address) => {

            !!result && this.form.get('address').setValue(result);
        });

        return dialogRef;

    }

    public onSubmit() {

        this.dialogRef.close(this.form.value);

    }

}