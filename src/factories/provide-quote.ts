import {Injectable} from '@angular/core';
import {FormGroup, FormBuilder, Validators} from '@angular/forms';
import {ProvideQuote} from "../interfaces/ProvideQuote";

@Injectable()
export class ProvideQuoteFactory {

    static form(ProvideQuote?: ProvideQuote): FormGroup {

        let _FormBuilder = new FormBuilder();

        let FormGroup = _FormBuilder.group({
            'price':          [null, [Validators.required]],
            'collectionDate': [null, [Validators.required]],
            'carrierNotes':   [null, [Validators.required]],
        });

        !!ProvideQuote && FormGroup.setValue(ProvideQuote);

        return FormGroup;
    }
}
