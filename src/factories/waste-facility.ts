import {Injectable} from '@angular/core';
import {FormGroup, FormBuilder, Validators} from '@angular/forms';
import {WasteFacility} from "../interfaces/WasteFacility";
import {AddressFormFactory} from "./address";

@Injectable()
export class WasteFacilityFormFactory {

    static form(WasteFacility?:WasteFacility):FormGroup {

        let _FormBuilder = new FormBuilder;

        let FormGroup = _FormBuilder.group({
            organisationId: [null],
            wasteFacilityId: [null],
            address: [null, [Validators.required, AddressFormFactory.validateAddress]],
            wastePermitNumber: [null,Validators.required],
            additionalLicences: [null],
            notes: [null],
        });

        !!WasteFacility && FormGroup.setValue(WasteFacility);

        return FormGroup;
    }
}