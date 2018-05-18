import {envParamsInterface} from '../../interfaces/envParams';

export const envParams: envParamsInterface = {
    cognito:   {
        poolData:       {
            UserPoolId: null,
            ClientId:   null,
        },
        region:         null,
        identityPoolId: null,
    },
    endpoints: {
        user: null,
        admin: null,
    },
};