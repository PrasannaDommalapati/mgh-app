import {Injectable} from '@angular/core';
import {FormGroup, FormBuilder, Validators} from '@angular/forms';
import {AddressFormFactory} from "./address";

@Injectable()
export class NotificationDetailsFormFactory {

    static form(NotificationDetails?:any):FormGroup {

        let _FormBuilder = new FormBuilder;

        let FormGroup = _FormBuilder.group({
            consignmentNoteCode: [null, [Validators.required]],
            wasteRemovedFromAddress: [null, [Validators.required, AddressFormFactory.validateAddress]],
            wasteTakenToAddress: [null, [Validators.required, AddressFormFactory.validateAddress]],
            wasteProducerAddress: [null, [Validators.required, AddressFormFactory.validateAddress]],
        });

        !!NotificationDetails && FormGroup.setValue(NotificationDetails);

        return FormGroup;
    }
}
