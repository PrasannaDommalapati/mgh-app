import {Address} from './Address';

export interface Organisation {
    organisationId?:string,
    notes:string,
    organisationName: string,
    address: Address,
    carrierRegistrationNumber?: string
}