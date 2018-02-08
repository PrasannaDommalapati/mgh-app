import {Injectable} from '@angular/core';
import {FormGroup, FormBuilder, FormControl, Validators} from '@angular/forms';
import {EwcCode} from "../interfaces/EwcCode";

@Injectable()
export class EwcCodeFormFactory {

    static form(EwcCode?:EwcCode):FormGroup {

        let _FormBuilder = new FormBuilder;

        let FormGroup = _FormBuilder.group({
            code: [null, [Validators.required]],
            description: [null, [Validators.required]],
            unIdentificationNumber: [null], // number
            shippingName: [null],
            unClass: [null],
            packagingGroup: [null],
            handlingRequirements: [null],
        });

        !!EwcCode && FormGroup.setValue(EwcCode);

        return FormGroup;
    }
}