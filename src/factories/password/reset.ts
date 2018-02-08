import {Injectable} from '@angular/core';
import {FormGroup, FormBuilder, Validators} from '@angular/forms';
import {PasswordNewFormFactory} from './new';

@Injectable()
export class PasswordResetFormFactory {

    static form(): FormGroup {

        return (new FormBuilder).group(
            {
                code:        [null, Validators.required],
                newPassword: PasswordNewFormFactory.form(),
            });
    }
}