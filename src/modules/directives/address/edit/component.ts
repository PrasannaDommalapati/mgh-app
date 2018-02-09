import {Component, Inject} from '@angular/core';
import {FormGroup} from '@angular/forms';
import {MatDialogRef, MAT_DIALOG_DATA} from '@angular/material';
import {AddressFormFactory} from '../../../../factories/address';

@Component(
    {
        selector:    'edit-address',
        templateUrl: 'component.html',
        styleUrls:   ['component.scss'],
    })
export class EditAddress {

    public contactDetails: boolean;
    public form: FormGroup;

    constructor(protected  dialogRef: MatDialogRef<EditAddress>, @Inject(MAT_DIALOG_DATA) public data: any) {
        this.form = AddressFormFactory.form();
    }

    ngOnInit() {

        this.contactDetails = !!this.data.contactDetails;
        !!this.data.address && this.reset();
    }

    public onSubmit() {

        this.dialogRef.close(this.form.value);
    }

    public reset() {

        this.form.setValue(this.data.address);
    }
}