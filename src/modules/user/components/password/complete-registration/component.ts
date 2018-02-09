import {Component, Inject} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {PasswordNewFormFactory} from '../../../../../factories/password/new';

@Component({
               selector:    'user-new-password-required',
               templateUrl: 'component.html',
               styleUrls:   ['component.scss'],
           })
export class CompleteRegistrationModal {

    public form: FormGroup;
    public loading: boolean = false;
    public error: string;

    constructor(private dialogRef: MatDialogRef<CompleteRegistrationModal>,
                @Inject(MAT_DIALOG_DATA) private requiredAttributes: any) {
    }

    ngOnInit() {

        this.form = (new FormBuilder)
            .group(
                {
                    given_name:  [null, [Validators.required]],
                    family_name: [null, [Validators.required]],
                    newPassword: PasswordNewFormFactory.form(),
                });
    }

    onSubmit() {

        this.dialogRef.close(this.form.getRawValue());
    }
}