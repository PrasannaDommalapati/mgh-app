import {Injectable} from '@angular/core';
import {FormGroup, FormBuilder, FormControl, Validators} from '@angular/forms';
import {Waste} from '../interfaces/Waste';

@Injectable()
export class WasteFormFactory {

    static form(Waste?: Waste): FormGroup {

        let _FormBuilder = new FormBuilder;

        let FormGroup = _FormBuilder.group(
            {
                qty:                         [null, [Validators.required]],
                ewcCode:                     [{}, [WasteFormFactory.ewcCodeValid]],
                description:                 [null, [Validators.required]],
                physicalDestructionRequired: [null],
                dataDestructionRequired:     [null],
            });

        !!Waste && FormGroup.patchValue(Waste);

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