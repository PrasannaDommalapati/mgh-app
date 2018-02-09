import {ICognitoUserPoolData} from 'amazon-cognito-identity-js';
import {IdentityPoolId} from 'aws-sdk/clients/cognitoidentity';

export interface Cognito {
    poolData: ICognitoUserPoolData,
    region: String,
    identityPoolId: IdentityPoolId
}