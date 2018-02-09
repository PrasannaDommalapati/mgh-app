import {Injectable} from '@angular/core';
import {FormGroup, FormBuilder, Validators, FormControl} from '@angular/forms';
import {Address} from "../interfaces/Address";

@Injectable()
export class AddressFormFactory {

    static form(Address?: Address): FormGroup {

        let _FormBuilder = new FormBuilder();

        let FormGroup = _FormBuilder.group({
            name: [null, [Validators.required]],
            address: [null, [Validators.required]],
            postcode: [null, [Validators.required, AddressFormFactory.validatePostCode]],
            phone: [null],
            email: [null],
            mobile: [null],
            fax: [null]
        });

        !!Address && FormGroup.setValue(Address);

        return FormGroup;
    }

    static validatePostCode(control: FormControl) {

        let postcode = /(GIR 0AA)|((([A-Za-z][\d]{1,2})|(([A-Za-z][A-Ha-hJ-Yj-y][\d]{1,2})|(([A-Za-z][\d][A-Za-h])|([A-Za-z][A-Ha-hJ-Yj-y][\d]?[A-Za-z])))) ?(\w*)[\d][A-Za-z]{2})$/;

        let valid = postcode.test(control.value);

        return valid ? null : {
            validPostCode: {
                valid: false
            }
        }
    }

    static validateAddress(control: FormControl) {

        let valid = (control.value instanceof Object);

        return valid ? null : {
            validAddress: {
                valid: false
            }
        };
    }
}
