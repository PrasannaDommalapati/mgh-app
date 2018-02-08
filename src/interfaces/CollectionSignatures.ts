import {Signature} from "./Signature";
import {Decline} from './Decline';

export interface CollectionSignatures {
    Carrier:   Signature,
    Consignor: Signature,
    decline?: Decline,
}