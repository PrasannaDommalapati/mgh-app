import {envParams} from '../environment/envParams';

export const environment = {

    cognito:   envParams.cognito,
    endpoint: {
        user: {
            organisations: (organisationId?: string) => environment.endpoint.base.organisations('user', 'me'),
        },
        base: {
            organisations: (role: string, organisationId?: string) => {

                let _endpoint = envParams.endpoints[role] + 'organisations';

                !!organisationId && (_endpoint += '/' + organisationId);

                return _endpoint;
            },
        }
    }
};
