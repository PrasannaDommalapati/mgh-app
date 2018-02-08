import {Injectable} from '@angular/core';
import {FormGroup, FormBuilder, Validators} from '@angular/forms';
import {PasswordNewFormFactory} from './new';

@Injectable()
export class PasswordChangeFormFactory {

    static form(): FormGroup {

        return (new FormBuilder).group(
            {
                oldPassword: [null, Validators.required],
                newPassword: PasswordNewFormFactory.form(),
            });
    }
}