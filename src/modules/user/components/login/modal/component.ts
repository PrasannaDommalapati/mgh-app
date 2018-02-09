import {Component}   from '@angular/core';
import {MatDialogRef} from "@angular/material";

@Component({
    selector:    'user-login-modal',
    templateUrl: 'component.html',
    styleUrls:   ['component.scss']
})
export class LoginModal {

    constructor(protected dialogRef: MatDialogRef<LoginModal>) {}

    public handleLogin(loggedIn:boolean) {

        this.dialogRef.close(loggedIn)
    }

}