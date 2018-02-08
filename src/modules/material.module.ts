import {NgModule} from '@angular/core';

import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {
    MdAutocompleteModule, MdButtonModule,
    MdCardModule, MdCheckboxModule,
    MdChipsModule,
    MdDatepickerModule, MdDialogModule,
    MdInputModule,
    MdNativeDateModule, MdSelectModule, MdSidenavModule, MdTabsModule, MdToolbarModule,
    MdTooltipModule,
} from '@angular/material';
import {ReactiveFormsModule} from '@angular/forms';

@NgModule(
    {
        imports: [
            BrowserAnimationsModule,
            MdCheckboxModule,
            MdDialogModule,
            MdButtonModule,
            MdSidenavModule,
            MdToolbarModule,
            MdTabsModule,
            MdSelectModule,
            MdInputModule,
            MdAutocompleteModule,
            MdTooltipModule,
            MdCardModule,
            MdChipsModule,
            MdDatepickerModule,
            MdNativeDateModule,
            ReactiveFormsModule,
        ],
        exports: [
            BrowserAnimationsModule,
            MdCheckboxModule,
            MdDialogModule,
            MdButtonModule,
            MdSidenavModule,
            MdToolbarModule,
            MdTabsModule,
            MdSelectModule,
            MdInputModule,
            MdAutocompleteModule,
            MdTooltipModule,
            MdCardModule,
            MdChipsModule,
            MdDatepickerModule,
            MdNativeDateModule,
            ReactiveFormsModule,
        ],
    })
export class HotelsMaterialModule {
}