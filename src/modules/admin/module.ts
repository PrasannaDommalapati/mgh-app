import {NgModule, CUSTOM_ELEMENTS_SCHEMA} from '@angular/core';
import {CommonModule} from '@angular/common';

import {HotelsMaterialModule} from '../material.module';

import {Api} from '../../app/services/api';
import {DirectivesModule} from '../directives/module';
import {routing} from '../../app/routing.module';
import {AdminOrganisationApi} from './services/organisation-api';

@NgModule(
    {
        imports:         [
            CommonModule,
            routing,
            HotelsMaterialModule,
            DirectivesModule,
        ],
        declarations:    [

        ],
        entryComponents: [],
        providers:       [
            Api,

            AdminOrganisationApi,
        ],
        schemas:         [
            CUSTOM_ELEMENTS_SCHEMA,
        ],
        exports:         [
        ],
    },
)
export class AdminModule {
}