import {Injectable} from '@angular/core';
import {environment} from '../../../app/constant/environment';
import {OrganisationApi} from '../../../app/services/organisation-api';

@Injectable()
export class AdminOrganisationApi extends OrganisationApi {

    protected getEndpoint(organisationId?: string) {

        return environment.endpoint.admin.organisations(organisationId);
    }
}