import {CollectionSignatures} from './CollectionSignatures';
import {Vehicle} from './Vehicle';
import {Decline} from './Decline';

export interface Collection {
    roundId: string, // vehicleId.collectionDate
    collectionId: string,
    carrierId: string,

    consignmentId: string, // for collection address

    vehicleId: string,
    Vehicle?: Vehicle,
    collectionDate: string,

    collectedTimestamp?: string,
    declinedTimestamp?: string,

    Signatures?: CollectionSignatures,
    decline?:Decline,

    collected?: boolean,
    declined?: boolean
}