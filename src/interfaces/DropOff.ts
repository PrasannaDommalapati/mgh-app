import {DropOffSignatures} from './DropOffSignatures';
import {WasteFacility} from './WasteFacility';
import {Decline} from './Decline';

export interface DropOff {
    roundId: string, // vehicleId.dropOffDate
    dropOffId: string,
    carrierId: string,
    collectionId: string,

    consignmentId?: string,

    wasteFacilityId: string, // for drop off address
    WasteFacility?: WasteFacility,

    vehicleId: string,
    dropOffDate: string,

    collectedTimestamp?: string,
    collectionDeclinedTimestamp?: string,

    droppedOffTimestamp?: string,
    declinedTimestamp?: string,

    Signatures?: DropOffSignatures,
    decline?:Decline,

    collected?: boolean,
    droppedOff?: boolean,
    declined?: boolean,
}