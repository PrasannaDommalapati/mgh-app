import {Component} from '@angular/core';
import {FormGroup} from '@angular/forms';

import {MdDialogRef} from '@angular/material';
import {PasswordChangeFormFactory} from '../../../../../factories/password/change';

@Component(
    {
        selector:    'user-password-change',
        templateUrl: 'component.html',
        styleUrls:   ['component.scss'],
    })
export class ChangePasswordModal {

    public form: FormGroup;

    constructor(protected dialogRef: MdDialogRef<ChangePasswordModal>) {
    }

    ngOnInit() {

        this.form = PasswordChangeFormFactory.form();
    }

    public onSubmit() {

        this.dialogRef.close(this.form.getRawValue());
    }
}