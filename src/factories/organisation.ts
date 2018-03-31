import {Injectable} from '@angular/core';
import {FormGroup, FormBuilder, Validators, FormControl} from '@angular/forms';
import {Register} from '../interfaces/Register';
import {PasswordNewFormFactory} from './password/new';
import {Organisation} from "../interfaces/Organisation";
import {AddressFormFactory} from "./address";

@Injectable()
export class OrganisationFormFactory {

    static form(Organisation?: Organisation): FormGroup {

        let _FormBuilder = new FormBuilder();

        let FormGroup = _FormBuilder.group(
            {
                name: [null, [Validators.required]],
                notes: [null, [Validators.required]],
                address:[null, [Validators.required, AddressFormFactory.validateAddress]],
                carrierRegistration: [null, [Validators.required]],
            });

        !!Organisation && Object.keys(Organisation).forEach(name => {
            if (FormGroup.controls[name]) {
                FormGroup.controls[name].patchValue(Organisation[name]);
            }
        });

        return FormGroup;

    }
}