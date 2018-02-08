import {Address} from "./Address";

export interface NotificationDetails {

    consignmentNoteCode: string,
    wasteRemovedAddress: Address,
    wasteTakenToAddress: Address,
    wasteProducerAddress: Address,
}