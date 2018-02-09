import {NgModule, CUSTOM_ELEMENTS_SCHEMA} from '@angular/core';
import {CommonModule} from '@angular/common';

import {HotelsMaterialModule} from '../material.module';
import {AddressSummary} from './address/summary/component';
import {EditAddress} from './address/edit/component';
import {AddImage} from './add-image/component';
@NgModule(
    {
        imports:         [
            CommonModule,
            HotelsMaterialModule,
        ],
        declarations:    [
            AddImage,

            AddressSummary,

            EditAddress,

        ],
        entryComponents: [
            EditAddress,


        ],
        providers:       [],
        schemas:         [
            CUSTOM_ELEMENTS_SCHEMA,
        ],
        exports:         [
            AddImage,

            AddressSummary,
        ],
    })
export class DirectivesModule {
}
