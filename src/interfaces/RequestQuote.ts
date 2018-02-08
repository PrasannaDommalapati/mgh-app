import {Carrier} from "./Carrier";
export interface RequestQuote {
    brokerId: string,
    brokerName: string,
    carrierName: string,
    carrierId: string,
    description: string,
    brokerNotes: string,
}