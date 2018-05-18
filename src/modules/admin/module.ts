import {NgModule, CUSTOM_ELEMENTS_SCHEMA} from '@angular/core';
import {CommonModule} from '@angular/common';

import {HotelsMaterialModule} from '../material.module';

import {Api} from '../../app/services/api';
import {DirectivesModule} from '../directives/module';
import {routing} from '../../app/routing.module';
import {AdminOrganisationApi} from './services/organisation-api';
import {OrganisationModule} from "../organisation/module";
import {AdminMenu} from "./components/menu/component";
import {AdminDashboard} from "./components/dashboard/component";

@NgModule(
    {
        imports:         [
            CommonModule,
            routing,
            HotelsMaterialModule,
            DirectivesModule,
            OrganisationModule
        ],
        declarations:    [
            AdminDashboard,
            AdminMenu
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
            AdminDashboard,
            AdminMenu
        ],
    },
)
export class AdminModule {
}