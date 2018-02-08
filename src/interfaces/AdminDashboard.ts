import {Organisation} from './Organisation';
import {AdminReport} from './AdminReport';

export interface AdminDashboard {

    AdminReport: AdminReport,
    Organisations: Organisation[]
}