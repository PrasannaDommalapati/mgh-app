import {Injectable} from '@angular/core';
import {FormGroup, FormBuilder, Validators} from '@angular/forms';
import {ConsigneesCertificate} from "../interfaces/ConsigneesCertificate";
import {AddressFormFactory} from "./address";
import {SignatureFormFactory} from "./signature";

@Injectable()
export class ConsigneesCertificateFormFactory {

    static form(ConsigneesCertificate?:ConsigneesCertificate):FormGroup {

        let _FormBuilder = new FormBuilder;

        let FormGroup = _FormBuilder.group({
            date: [null, [Validators.required]],
            address: [null, [Validators.required, AddressFormFactory.validateAddress]],
            vehicleRegistrationNumber: [null, [Validators.required]],
            rejectionDetails: [null],
            consigneeRegistrationNumber: [null, [Validators.required]],
            numberOfConsignments: [null, [Validators.required]],
            signature: [null, [Validators.required, SignatureFormFactory.validateSignature]],
        });

        !!ConsigneesCertificate && FormGroup.setValue(ConsigneesCertificate);

        return FormGroup;
    }
}