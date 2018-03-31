import {Component} from '@angular/core';
import {MatDialog, MatDialogConfig, MatDialogRef} from "@angular/material";
import {EditAddress} from "../../../directives/address/edit/component";
import {FormGroup} from "@angular/forms";
import {OrganisationFormFactory} from "../../../../factories/organisation";
import {Address} from "../../../../interfaces/Address";

@Component({
    selector:    'create-organisation',
    templateUrl: 'component.html',
    styleUrls:   ['component.scss']
})
export class CreateOrganisation {

    public form: FormGroup;
    constructor(private Dialog:MatDialog,
                protected dialogRef: MatDialogRef<CreateOrganisation>) {
        this.form = OrganisationFormFactory.form();
    }

    public editAddress() {

        let config = new MatDialogConfig;

        config.disableClose = false;
        config.data = {
            contactDetails: true,
        };
        let dialogRef = this.Dialog.open(EditAddress, config);

        dialogRef.afterClosed().subscribe((result: Address) => {

            !!result && this.form.get('address').setValue(result);
        });

        return dialogRef;

    }

    public onSubmit() {

        this.dialogRef.close(this.form.value);
    }

}