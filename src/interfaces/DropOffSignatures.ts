import {Signature} from "./Signature";
import {Decline} from './Decline';

export interface DropOffSignatures {
    Consignee:   Signature,
    decline?: Decline,
}