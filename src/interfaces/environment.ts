import {Cognito} from './Cognito';
export interface Environment {
    
    consignments: {
        endpoint: Function
    },
    waste: {
        endpoint: Function
    },
    carriers: {
        endpoint: Function
    },
    consignmentQuotes: {
        endpoint: Function
    },
    quotes: {
        endpoint: Function
    },
    wasteFacilities: {
        endpoint: Function
    },
    vehicles: {
        endpoint: Function
    },
    cognito : Cognito
}