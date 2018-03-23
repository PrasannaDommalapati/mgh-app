import {NgModule} from '@angular/core';

import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {
    MatAutocompleteModule,
<<<<<<< HEAD
    MatButtonModule, MatCardModule,
    MatCheckboxModule, MatChipsModule, MatDatepickerModule, MatDialogModule, MatInputModule, MatNativeDateModule,
    MatSelectModule,
    MatSidenavModule,
    MatTabsModule,
    MatToolbarModule, MatTooltipModule
=======
    MatButtonModule,
    MatCardModule,
    MatCheckboxModule,
    MatChipsModule,
    MatDatepickerModule,
    MatDialogModule,
    MatInputModule,
    MatNativeDateModule,
    MatSelectModule,
    MatSidenavModule,
    MatTabsModule,
    MatToolbarModule,
    MatTooltipModule
>>>>>>> 8d34e99f5d18c623c94d08a244645d80b5660559

} from '@angular/material';
import {ReactiveFormsModule} from '@angular/forms';

@NgModule(
    {
        imports: [
            BrowserAnimationsModule,
            MatCheckboxModule,
            MatDialogModule,
            MatButtonModule,
            MatSidenavModule,
            MatToolbarModule,
            MatTabsModule,
            MatSelectModule,
            MatInputModule,
            MatAutocompleteModule,
            MatTooltipModule,
            MatCardModule,
            MatChipsModule,
            MatDatepickerModule,
            MatNativeDateModule,
            ReactiveFormsModule,
        ],
        exports: [
            BrowserAnimationsModule,
            MatCheckboxModule,
            MatDialogModule,
            MatButtonModule,
            MatSidenavModule,
            MatToolbarModule,
            MatTabsModule,
            MatSelectModule,
            MatInputModule,
            MatAutocompleteModule,
            MatTooltipModule,
            MatCardModule,
            MatChipsModule,
            MatDatepickerModule,
            MatNativeDateModule,
            ReactiveFormsModule,
        ]
    })
export class HotelsMaterialModule {
}