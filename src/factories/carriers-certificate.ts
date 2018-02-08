import {Injectable} from '@angular/core';
import {FormGroup, FormBuilder, Validators} from '@angular/forms';
import {CarriersCertificate} from "../interfaces/CarriersCertificate";
import {AddressFormFactory} from "./address";
import {SignatureFormFactory} from "./signature";

@Injectable()
export class CarriersCertificateFormFactory {

    static form(CarriersCertificate?:CarriersCertificate):FormGroup {

        let _FormBuilder = new FormBuilder;

        let FormGroup = _FormBuilder.group({
            roundNumber: [null],
            collectionNumber: [null],
            address: [null, [Validators.required, AddressFormFactory.validateAddress]],
            carrierRegistrationNumber: [null, [Validators.required]],
            vehicleRegistrationNumber: [null, [Validators.required]],
            signature: [null, [Validators.required, SignatureFormFactory.validateSignature]],
        });

        !!CarriersCertificate && FormGroup.setValue(CarriersCertificate);

        return FormGroup;
    }
}