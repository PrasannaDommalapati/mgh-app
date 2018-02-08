import {Waste} from "./Waste";
import {EwcCode} from "./EwcCode";

export interface DescriptionOfTheWaste {

    process: string,
    sicCode: string,
    wasteTable: Waste[],
    ewcTable: EwcCode[]
}