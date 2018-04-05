export interface envParamsInterface {
    cognito:  {
        poolData:       {
            UserPoolId: string,
            ClientId:   string,
        },
        region:         string,
        identityPoolId: string,
    },
    endpoints: {
        user: string,
        admin:string,
    },
};
