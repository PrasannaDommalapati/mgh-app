import {Injectable} from '@angular/core';
import {FormGroup, FormBuilder, Validators, FormControl} from '@angular/forms';
import {AddressFormFactory} from './address';
import {Consignment} from '../interfaces/Consignment';

@Injectable()
export class ConsignmentFormFactory {

    static form(Consignment?: Consignment): FormGroup {

        let _FormBuilder = new FormBuilder;

        let FormGroup = _FormBuilder.group({
            consignmentId:                        [null],
            brokerId:                             [null],
            consignmentNoteCode:                  [null, [Validators.required, Validators.pattern(/^.{10,}$/)]],
            description:                          [null, [Validators.required, Validators.pattern(/^.{0,60}$/)]],
            wasteRemovedFromAddress:              [null, [Validators.required, AddressFormFactory.validateAddress]],
            wasteProducerAddress:                 [null, [Validators.required, AddressFormFactory.validateAddress]],
            removedFromAndProducerAddressTheSame: [null],
            wasteDescriptionProcess:              [null, [Validators.required]],
            wasteDescriptionSic2007:              [{}, [ConsignmentFormFactory.sicCodeValid]],
        });

        !!Consignment && Object.keys(Consignment).forEach(name => {
            if (FormGroup.controls[name]) {
                FormGroup.controls[name].patchValue(Consignment[name]);
            }
        });

        return FormGroup;
    }

    static sicCodeValid(control: FormControl) {

        let valid = (control.value instanceof Object);

        !!valid && (valid = !!control.value.code && !!control.value.description);

        return valid ? null : {
            validCode: {
                valid: false,
            },
        };

    }
}