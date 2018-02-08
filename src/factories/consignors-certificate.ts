import {Injectable} from '@angular/core';
import {FormGroup, FormBuilder, Validators} from '@angular/forms';
import {ConsignorsCertificate} from "../interfaces/ConsignorsCertificate";
import {AddressFormFactory} from "./address";
import {SignatureFormFactory} from "./signature";

@Injectable()
export class ConsignorsCertificateFormFactory {

    static form(ConsignorsCertificate?:ConsignorsCertificate):FormGroup {

        let _FormBuilder = new FormBuilder;

        let FormGroup = _FormBuilder.group({
            address: [null, [Validators.required, AddressFormFactory.validateAddress]],
            signature: [null, [Validators.required, SignatureFormFactory.validateSignature]],
        });

        !!ConsignorsCertificate && FormGroup.setValue(ConsignorsCertificate);

        return FormGroup;
    }
}