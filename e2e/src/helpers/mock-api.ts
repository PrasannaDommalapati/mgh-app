import * as faker         from 'faker';
import {ApiConfig}        from '../interfaces/api/config';
import {ApiMockEndpoint}  from '../interfaces/api/mock-endpoint';
import {MockServerClient} from '../interfaces/mock-server-client';
import {Jwt} from "../../../src/interfaces/jwt";

export class MockApi {

    public constructor() {
    }

    public setupEndpoints(
        MockServerClient: MockServerClient,
        ApiConfigs: ApiConfig[]) {

        return Promise.resolve()
                      .then(() => MockServerClient.clear())
                      .then(() => Promise.all(ApiConfigs.map(
                          ApiConfig => this.setServerResponse(MockServerClient,
                                                              ApiConfig))));
    }

    private setServerResponse(
        MockServerClient: MockServerClient,
        ApiConfig: ApiConfig) {

        let Response = ApiConfig.Response;
        let Request  = ApiConfig.Request;

        let statusCode = !!Response.statusCode ? Response.statusCode : 200;
        let body       = !!Response.body ? Response.body : {
            data   : null,
            status : true,
            message: null
        };

        const mock: ApiMockEndpoint = {
            httpRequest : {
                method: Request.method,
                path  : Request.path
            },
            httpResponse: {
                statusCode: statusCode,
                headers   : [
                    {
                        name  : 'Access-Control-Allow-Headers',
                        values: ['Authorization']
                    },
                    {
                        name  : 'Access-Control-Allow-Methods',
                        values: ['*']
                    },
                    {
                        name  : 'Access-Control-Allow-Origin',
                        values: ['*']
                    },
                    {
                        name  : 'Access-Control-Expose-Headers',
                        values: ['Authorization']
                    },
                    {
                        name  : 'Content-Type',
                        values: ['application/json; charset=utf-8']
                    },
                    {
                        name  : 'Authorization',
                        values: [this.getJwt(Response.roles)]
                    }
                ],
                body      : `)]}',\n${JSON.stringify(body)}`
            }
        };

        return new Promise(
            resolve => MockServerClient.mockAnyResponse(mock)
                                       .then(
                                           result => resolve()));
    }

    private getJwt(userType: string[]) {

        let jwt: Jwt = {
            'id'          : faker.random.number(),
            'capabilities': {
                'groups': []
            },
            'timestamp'   : faker.random.number(),
            'build'       : faker.random.number(),
            'hash'        : faker.random.alphaNumeric(),
            'userData'    : null
        };

        let adminGroups;

        jwt.capabilities.groups.push(...userType);

        adminGroups = jwt.capabilities.groups.filter(
            group => /^.*-admin$/.test(group));

        !!adminGroups.length && jwt.capabilities.groups.unshift('admin');

        return Buffer.from(JSON.stringify(jwt))
                     .toString('base64');
    }
}
