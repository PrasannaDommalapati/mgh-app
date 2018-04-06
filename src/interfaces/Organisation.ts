import {Address} from './Address';

export interface Organisation {
    organisationId?:string,
    notes:string,
    name: string,
    address: Address,
    carrierRegistration?: string
}