import {Injectable} from '@angular/core';
import {FormGroup, FormBuilder, Validators} from '@angular/forms';

@Injectable()
export class PasswordForgotFormFactory {

    static form(): FormGroup {

        return (new FormBuilder).group(
            {
                email: [null, Validators.required],
            });
    }
}