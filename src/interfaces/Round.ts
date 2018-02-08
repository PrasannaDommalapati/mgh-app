import {Collection} from './Collection';
import {DropOff} from './DropOff';
import {Consignment} from './Consignment';

export interface Round {
    jwt?: string,
    vehicleId?: string,
    roundDate?: string,

    Collections: Collection[],
    DropOffs: DropOff[],
    Consignments: Consignment[],
}