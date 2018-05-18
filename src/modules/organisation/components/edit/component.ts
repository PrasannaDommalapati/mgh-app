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
               selector:   'edit-organisation',
               templateUrl:'component.html',
               styleUrls:  ['component.scss'],
           })
export class EditOrganisation {

    public form: FormGroup;
    public organisationId: string;

    constructor(
        private Dialog: MatDialog,
        private OrganisationApi: AdminOrganisationApi,
        protected dialogRef: MatDialogRef<EditOrganisation>,
        @Inject(MAT_DIALOG_DATA) public data: any,
    ) {

    }

    ngOnInit() {

        this.organisationId = this.data;

        this.form = OrganisationFormFactory.form();

        !!this.organisationId && this.set();

    }

    public set() {

        this.form.disable();
        this.OrganisationApi
            .get(this.organisationId)
            .then((Organisation: Organisation) => {

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
            address:       this.form.get('address').value,
            contactDetails:true,
        };
        let dialogRef       = this.Dialog.open(EditAddress, config);

        dialogRef.afterClosed().subscribe((result: Address) => {

            !!result && this.form.get('address').setValue(result);
        });

        return dialogRef;

    }

    public onSubmit() {


        let form = Object.assign({}, this.form.value);

        form.organisationId = !form['organisationId'] ? this.organisationId :form['organisationId'];

        this.dialogRef.close(form);

    }

}
