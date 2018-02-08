import {NgModule, NO_ERRORS_SCHEMA, CUSTOM_ELEMENTS_SCHEMA, LOCALE_ID} from '@angular/core';
import {CommonModule} from '@angular/common';

import {HttpModule} from '@angular/http';

import {LocalStorageModule} from 'angular-2-local-storage';
import {HotelsMaterialModule} from '../modules/material.module';

import {routing, appRouting} from './routing.module';
import {AppComponent} from './component';

import {UserModule} from '../modules/user/module';

import {Welcome} from './components/pages/welcome/component';
import {About} from './components/pages/about/component';

import {Dashboard} from './components/dashboard/component';
import {AwSnackBar} from './services/aw-snack-bar';

@NgModule(
    {
        imports:         [
            CommonModule,
            HttpModule,
            routing,
            HotelsMaterialModule,
            LocalStorageModule.withConfig(
                {
                    prefix:      'Hotels',
                    storageType: 'localStorage',
                }),
            UserModule,
        ],
        declarations:    [
            AppComponent,

            Welcome,
            About,
            Dashboard,
        ],
        entryComponents: [
        ],
        providers:       [
            {provide: LOCALE_ID, useValue: 'en-GB'},
            appRouting,
            AwSnackBar
        ],
        bootstrap:       [
            AppComponent,
        ],
        schemas:         [
            NO_ERRORS_SCHEMA, CUSTOM_ELEMENTS_SCHEMA,
        ],
    })
export class AppModule {
}
