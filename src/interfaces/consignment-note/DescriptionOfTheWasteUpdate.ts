import {ConsignmentNoteUpdate} from './ConsignmentNoteUpdate';
import {Waste} from '../Waste';

export interface DescriptionOfTheWasteUpdate extends ConsignmentNoteUpdate {
    update?: Waste,
}