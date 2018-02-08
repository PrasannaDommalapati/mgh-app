export interface ProvideQuote {
    consignmentId?: string,
    quoteId?: string,
    price: string,
    collectionDate: Date | null,
    carrierNotes: string,
}