import {Injectable} from '@angular/core';

import {RequestOptions} from '@angular/http';
import {Api} from './api';
import {Organisation} from '../../interfaces/Organisation';

@Injectable()
export abstract class OrganisationApi {
    public constructor(private Api: Api) {

    }

    public list() {

        let endpoint = this.getEndpoint();
        let options  = new RequestOptions({method: 'GET'});

        return this.Api.request(endpoint, options);
    }

    public get (organisationId: string) {

        let endpoint = this.getEndpoint(organisationId);
        let options  = new RequestOptions({method: 'GET'});

        return this.Api.request(endpoint, options);
    }

    public save(Organisation: Organisation) {

        return !!Organisation.organisationId ? this.put(Organisation.organisationId, Organisation) : this.post(Organisation);
    }

    public remove(organisationId: string) {

        let endpoint = this.getEndpoint(organisationId);
        let options  = new RequestOptions({method: 'DELETE'});

        return this.Api.request(endpoint, options);
    }

    protected abstract getEndpoint(organisationId?: string):string;

    private post(Organisation: Organisation) {

        let endpoint = this.getEndpoint();
        let options  = new RequestOptions({method: 'POST', body: Organisation});

        return this.Api.request(endpoint, options);
    }

    private put(organisationId: string, Organisation: Organisation) {

        let endpoint = this.getEndpoint(organisationId);
        let options  = new RequestOptions({method: 'PUT', body: Organisation});

        return this.Api.request(endpoint, options);
    }
}