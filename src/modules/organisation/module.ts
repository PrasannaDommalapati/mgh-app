import {NgModule}             from '@angular/core';
import {CommonModule}         from '@angular/common';
import {HotelsMaterialModule} from '../material.module';
import {ReactiveFormsModule}  from '@angular/forms';
import {routing}              from '../../app/routing.module';
import {CreateOrganisation}   from "./components/create/component";
import {OrganisationList}     from './components/list/component';


@NgModule(
    {
        imports:         [
            CommonModule,
            routing,
            HotelsMaterialModule,
            ReactiveFormsModule,
        ],
        declarations:    [

            CreateOrganisation,
            OrganisationList

        ],
        entryComponents: [
            CreateOrganisation,
            OrganisationList
        ],
        providers:       [

        ],
        exports:         [
            OrganisationList
        ],
    },
)
export class OrganisationModule {
}