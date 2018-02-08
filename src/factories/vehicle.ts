import {Injectable} from '@angular/core';
import {FormGroup, FormBuilder, FormControl, Validators} from '@angular/forms';
import {Waste} from "../interfaces/Waste";

@Injectable()
export class VehicleFormFactory {

    static form(Waste?:Waste):FormGroup {

        let _FormBuilder = new FormBuilder;

        let FormGroup = _FormBuilder.group({
            organisationId: [null],
            vehicleId: [null],
            vehicleRegistration: [null, [Validators.required]],
            pinCode: [null, [Validators.required]],
            notes: [null]

        });

        !!Waste && FormGroup.setValue(Waste);

        return FormGroup;
    }
}