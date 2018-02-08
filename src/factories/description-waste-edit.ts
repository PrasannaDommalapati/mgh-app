import {Injectable} from '@angular/core';
import {FormGroup, FormBuilder, FormControl, Validators} from '@angular/forms';
import {Waste} from '../interfaces/Waste';

@Injectable()
export class WasteEdit {

    static form(Waste?: Waste): FormGroup {

        let _FormBuilder = new FormBuilder;

        let FormGroup = _FormBuilder.group(
            {
                consignmentId: [null],
                wasteId:       [null],
                description:   [null, [Validators.required]],
                code:          [{}, [WasteEdit.ewcCodeValid]],
                quantity:      [null, [Validators.required]],
            });

        !!Waste && FormGroup.setValue(Waste);

        return FormGroup;
    }

    static ewcCodeValid(control: FormControl) {

        let valid = (control.value instanceof Object);

        !!valid && (valid = !!control.value.code && !!control.value.description);

        return valid ? null : {
            validCode: {
                valid: false,
            },
        };

    }

}