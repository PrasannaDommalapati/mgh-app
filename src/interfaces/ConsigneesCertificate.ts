import {Address} from "./Address";
import {Signature} from "./Signature";

export interface ConsigneesCertificate {
    date: Date,
    address: Address,
    vehicleRegistrationNumber: string,
    rejectionDetails?: string,
    consigneeRegistrationNumber: string,
    numberOfConsignments: number,
    signature: Signature,
}