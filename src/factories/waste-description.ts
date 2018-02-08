import {Injectable} from '@angular/core';
import {FormGroup, FormBuilder, Validators, FormArray} from '@angular/forms';

@Injectable()
export class WasteDescriptionFormFactory {

    static form(WasteDescription?:any):FormGroup {

        let _FormBuilder = new FormBuilder;

        let FormGroup = _FormBuilder.group({
            wasteDescriptionProcess: [null, [Validators.required]],
            wasteDescriptionSic2007: [null, [Validators.required]],
            wasteDetails: _FormBuilder.array([], WasteDescriptionFormFactory.validWasteArray),
        });

        !!WasteDescription && FormGroup.setValue(WasteDescription);

        return FormGroup;
    }

    static validWasteArray(FormArray:FormArray) {

        let valid = !!FormArray.controls.length;

        return valid ? null : {
                validWasteDetails: {
                    valid: false
                }
            };
    }
}