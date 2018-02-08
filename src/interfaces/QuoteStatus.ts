import {Quote} from './Quote';
import {Job} from './Job';
import {Consignment} from './Consignment';

export interface QuoteStatus {
    requested: Quote[],
    provided: Quote[],
    accepted: Quote[],
    consignments: Consignment[],
    live: Job[],
    closed: Job[],
}