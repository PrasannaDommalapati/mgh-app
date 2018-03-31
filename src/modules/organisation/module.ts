import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {HotelsMaterialModule} from '../material.module';
import {ReactiveFormsModule} from '@angular/forms';
import {routing} from '../../app/routing.module';
import {CreateOrganisation} from "./components/create/component";


@NgModule(
    {
        imports:         [
            CommonModule,
            routing,
            HotelsMaterialModule,
            ReactiveFormsModule,
        ],
        declarations:    [

            CreateOrganisation

        ],
        entryComponents: [
            CreateOrganisation
        ],
        providers:       [

        ],
        exports:         [
        ],
    },
)
export class OrganisationModule {
}