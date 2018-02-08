import {Consignment} from "./Consignment";
import {ConsignmentNote} from "./ConsignmentNote";

export interface BrokerDashboard {
    created:Consignment[],
    waiting:Consignment[],
    quoted:Consignment[],
    accepted:Consignment[],
    live:ConsignmentNote[],
    closed:ConsignmentNote[],
}