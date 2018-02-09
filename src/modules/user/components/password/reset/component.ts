import {Component, Inject}   from '@angular/core';
import {MatDialogRef, MAT_DIALOG_DATA} from "@angular/material";
import {FormGroup} from "@angular/forms";
import {UserService} from "../../../services/user-api";
import {PasswordResetFormFactory} from '../../../../../factories/password/reset';

@Component({
    selector:    'user-password-new',
    templateUrl: 'component.html',
    styleUrls:   ['component.scss']
})
export class ResetPasswordModal {

    public form: FormGroup;
    public loading: boolean = false;
    public error: string;

    constructor(public UserService: UserService,
                protected dialogRef: MatDialogRef<ResetPasswordModal>,
                @Inject(MAT_DIALOG_DATA) public data: any) {
    }

    ngOnInit() {

        this.form = PasswordResetFormFactory.form();
    }

    onSubmit() {

        let form = this.form.getRawValue();

        // start loading
        this.loading = true;
        this.error = null;

        this.UserService
            .resetPassword(form.code,form.newPassword.password)
            .then(
                confirmed => this.dialogRef.close(confirmed),
                error     => this.handleError(error)
            );
    }

    protected handleError(error: string) {

        // hide loading
        this.loading = false;

        // display error
        this.error = error;
    }
}