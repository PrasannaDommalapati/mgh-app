import {EwcCode} from "./EwcCode";

export interface Waste {
    consignmentId?:string,
    wasteId?:string,
    description:string,
    ewcCode:EwcCode,
    qty:number,
    physicalDestructionRequired?:boolean,
    dataDestructionRequired?:boolean,
}