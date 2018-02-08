export interface Job {
    jobId: string,
    consignmentId: string,
    carrierId: string,
    brokerId: string,
    vehicleId: string,
    wasteFacilityId: string,

    description: string,
    brokerName: string,
    brokerNotes: string,
    carrierName: string,
    carrierNotes: string,
    price: string,

    status?: string,

    collectionId: string,
    collectionDate: string,
    collectedTimestamp?: string,
    collectionDeclinedTimestamp?: string,

    dropOffId: string,
    dropOffDate: string,
    droppedOffTimestamp?: string,
    dropOffDeclinedTimestamp?: string,

    completedTimestamp?: string,
}