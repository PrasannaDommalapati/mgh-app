import {Injectable} from '@angular/core';
import {FormGroup, FormBuilder, Validators} from '@angular/forms';
import {Allocation} from '../interfaces/Allocation';

@Injectable()
export class AllocateJobFactory {

    static form(Allocation?: Allocation): FormGroup {

        let _FormBuilder = new FormBuilder();

        let FormGroup = _FormBuilder.group(
            {
                'wasteFacilityId': [{
                    value:    null,
                    disabled: true,
                }, [Validators.required]],
                'vehicleId':       [{
                    value:    null,
                    disabled: true,
                }, [Validators.required]],
                'collectionDate':  [null, [Validators.required]],
                'dropOffDate':     [null, [Validators.required]],

            });

        !!Allocation && Object.keys(Allocation).forEach(name => {
            if (FormGroup.controls[name]) {
                FormGroup.controls[name].patchValue(Allocation[name]);
            }
        });

        return FormGroup;
    }
}
