import {Injectable} from '@angular/core';
import {FormGroup, FormBuilder, Validators, FormControl} from '@angular/forms';
import {RequestQuote} from "../interfaces/RequestQuote";

@Injectable()
export class RequestQuoteFactory {

    static form(RequestQuote?: RequestQuote): FormGroup {

        let _FormBuilder = new FormBuilder();

        let FormGroup = _FormBuilder.group({
            'brokerName':  [null, [Validators.required]],
            'Carrier':     [null, [Validators.required]],
            'description': [null, [Validators.required]],
            'brokerNotes': [null],
            'wasteImage': [null, [Validators.required]],
        });

        !!RequestQuote && FormGroup.setValue(RequestQuote);

        return FormGroup;
    }
}
