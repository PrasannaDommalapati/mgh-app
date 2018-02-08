import {Component, Input} from '@angular/core';

import {Address} from '../../../../interfaces/Address';

@Component(
    {
        selector:    'address-summary',
        templateUrl: 'component.html',
        styleUrls:   ['component.scss'],
    })
export class AddressSummary {

    @Input() Address: Address;
    @Input() title: string;
}