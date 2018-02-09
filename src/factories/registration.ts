import {Injectable} from '@angular/core';
import {FormGroup, FormBuilder, Validators, FormControl} from '@angular/forms';
import {Register} from '../interfaces/Register';
import {PasswordNewFormFactory} from './password/new';

@Injectable()
export class RegistrationFormFactory {

    static form(Register?: Register): FormGroup {

        let _FormBuilder = new FormBuilder();

        let FormGroup = _FormBuilder.group(
            {
                given_name:  [null, [Validators.required]],
                family_name: [null, [Validators.required]],
                email:       [null, [Validators.required]],
                acceptTerms: [null, [RegistrationFormFactory.acceptTermsAndConditions]],
                newPassword: PasswordNewFormFactory.form(),
            });

        !!Register && FormGroup.setValue(Register);

        return FormGroup;
    }

    static acceptTermsAndConditions(AcceptTerms: FormControl) {

        return !!AcceptTerms.value ? null : {
            validAcceptTerms: {
                valid: 'You must accept AnyWaste.com terms and conditions.',
            },
        };
    }
}