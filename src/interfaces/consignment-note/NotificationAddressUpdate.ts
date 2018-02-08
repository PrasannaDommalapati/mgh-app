import {Address} from '../Address';
import {ConsignmentNoteUpdate} from './ConsignmentNoteUpdate';

export interface NotificationAddressUpdate extends ConsignmentNoteUpdate {
    update?: Address,
}