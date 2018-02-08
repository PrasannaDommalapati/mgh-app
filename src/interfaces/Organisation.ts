import {Address} from './Address';

export interface Organisation {
    organisationId:string
    name: string,
    address: Address,
    carrierRegistrationNumber?: string
}