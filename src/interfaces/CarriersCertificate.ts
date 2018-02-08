import {Address} from "./Address";
import {Signature} from "./Signature";

export interface CarriersCertificate {
    roundNumber?: string
    collectionNumber?: string,
    address: Address,
    carrierRegistrationNumber: string,
    vehicleRegistrationNumber: string,
    signature: Signature,
}