import {Injectable} from '@angular/core';
import {FormGroup, FormBuilder, Validators} from '@angular/forms';

@Injectable()
export class PasswordNewFormFactory {

    public static form(): FormGroup {

        return (new FormBuilder).group(
            {
                password:        [null, Validators.required],
                confirmPassword: [null, Validators.required],
            },
            {validator: PasswordNewFormFactory.passwordsMatch},
        );
    }

    private static passwordsMatch(group: FormGroup) {

        let match = (group.controls['password'].value == group.controls['confirmPassword'].value);

        return (match) ? null : {areEqual: 'Passwords do not match'};
    }
}