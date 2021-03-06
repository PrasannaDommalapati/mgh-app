import {NgModule}             from '@angular/core';
import {CommonModule}         from '@angular/common';
import {DirectivesModule}     from '../directives/module';
import {HotelsMaterialModule} from '../material.module';
import {ReactiveFormsModule}  from '@angular/forms';
import {routing}              from '../../app/routing.module';
import {EditOrganisation}   from "./components/edit/component";
import {OrganisationList}     from './components/list/component';


@NgModule(
    {
        imports:         [
            CommonModule,
            routing,
            DirectivesModule,
            HotelsMaterialModule,
            ReactiveFormsModule,
        ],
        declarations:    [

            EditOrganisation,
            OrganisationList

        ],
        entryComponents: [
            EditOrganisation,
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