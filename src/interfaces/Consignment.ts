import {Address} from './Address';
import {Waste} from './Waste';
import {QuotesList} from './QuotesList';
import {SicCode} from './SicCode';
import {WasteFacility} from './WasteFacility';
import {Organisation} from './Organisation';
import {Collection} from './Collection';
import {DropOff} from './DropOff';
import {Job} from './Job';
import {Quote} from './Quote';

export interface Consignment {
    brokerId?: string,
    consignmentId?: string,

    consignmentNoteCode: string,
    description: string,
    wasteRemovedFromAddress: Address,
    wasteProducerAddress: Address,
    wasteDescriptionProcess: string,
    wasteDescriptionSic2007: SicCode,

    Waste?: Waste[],

    quoteRequestTimestamp?: string,
    quoteProvideTimestamp?: string,

    jobAcceptTimestamp?: string,
    jobAllocateTimestamp?: string,

    collectedTimestamp?: string,
    collectionDeclinedTimestamp?: string,

    droppedOffTimestamp?: string,
    dropOffDeclinedTimestamp?: string,

    completedTimestamp?: string,

    status?: string,

    Quotes?: QuotesList,
    Quote?: Quote,

    jobId?: string,
    Job?: Job,

    collectionId?: string,
    Collection?: Collection,

    carrierId?: string,
    vehicleId?: string,
    Carrier?: Organisation,
    collectionDate?: string,

    dropOffId?: string,
    DropOff?: DropOff,

    wasteFacilityId?: string,
    WasteFacility?: WasteFacility,
    dropOffDate?: string,
}