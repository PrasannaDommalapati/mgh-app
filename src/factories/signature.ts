import {Injectable} from '@angular/core';
import {FormGroup, FormBuilder, Validators, FormControl} from '@angular/forms';
import {Signature} from '../interfaces/Signature';

@Injectable()
export class SignatureFormFactory {

    static form(Signature?: Signature): FormGroup {

        let _FormBuilder = new FormBuilder();

        let FormGroup = _FormBuilder.group({
            'signature': [null, [Validators.required]],
            'signatureName':      [null, [Validators.required]],
            'signatureDate':      [null, [Validators.required]],
        });

        !!Signature && FormGroup.setValue(Signature);

        return FormGroup;
    }

    static validateSignature(control: FormControl) {

        let valid = (control.value instanceof Object);

        return valid ? null : {
            validSignature: {
                valid: false,
            },
        };
    }

    static formatDate(date?: Date) {

        date = date || new Date();

        return date.toISOString().slice(0, 16);
    }
}
