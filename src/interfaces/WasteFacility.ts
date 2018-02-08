import {Address} from "./Address";
export interface WasteFacility {
    organisationId?: string,
    wasteFacilityId?: string,
    address: Address,
    wastePermitNumber: string,
    additionalLicences: string,
    notes: string,

}