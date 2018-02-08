import {QuotesList} from './QuotesList';

export interface Quote {
    quoteId?: string,
    consignmentId: string,
    brokerId: string,
    brokerName: string,
    carrierName: string,
    carrierId: string,
    description: string,
    brokerNotes: string,

    Quotes?: QuotesList,
    price?: string,
    collectionDate?: string,
    carrierNotes?: string,

    status?: string,

    requestTimestamp?: string,
    provideTimestamp?: string,

    jobAcceptTimestamp?: string,
    jobAllocateTimestamp?: string,

    vehicleId?: string,
    wasteFacilityId?: string,
    dropOffDate?: string,

    collectedTimestamp?: string,
    collectionDeclinedTimestamp?: string,

    droppedOffTimestamp?: string,
    dropOffDeclinedTimestamp?: string,

    completedTimestamp?: string,

    wasteImageContentType?:string,
    wasteImagePutUrl?: string,
    wastePhotoUrl?: string,
}