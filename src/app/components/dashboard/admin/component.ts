import {Component} from '@angular/core';
import {Angular2Csv} from "angular2-csv";
import {Api} from "../../../services/api";
import {RequestOptions} from "@angular/http";

@Component({
    selector:    'admin-dashboard',
    templateUrl: 'component.html',
    styleUrls:   ['component.scss']
})
export class AdminDashboard {

    public constructor(private Api: Api) {
    }

    public generateReport() {
        //company or org
        //total number of jobs

        let options = new RequestOptions({method: 'GET'});
        this.Api.request('https://zpoiv7bs5h.execute-api.eu-west-2.amazonaws.com/staging/consignments/export/7', options);
        new Promise((resolve, reject) => {

            resolve([
                {
                    organisation:   'one',
                    consignmentNotes:   '34314',
                },
                {
                    organisation:   'two',
                    consignmentNotes:   '4',
                },
                {
                    organisation:   'three',
                    consignmentNotes:   '87',
                }
            ])

        }).then(
            (data: any)     => this.printCsvReport(data, 'AnyWasteReport'),
            (error: string) => alert(error)
        )
    }

    private printCsvReport(data: any, filename: string) {

        new Angular2Csv(data, filename, {showLabels: true, headers: ['Organisation', 'Consignment Notes']})

    }


}