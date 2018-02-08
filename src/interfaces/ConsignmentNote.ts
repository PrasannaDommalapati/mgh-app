import {Collection} from "./Collection";
import {DropOff} from "./DropOff";
import {NotificationDetails} from "./NotificationDetails";
import {DescriptionOfTheWaste} from "./DescriptionOfTheWaste";
import {WasteImage} from "./WasteImage";

export interface ConsignmentNote {

    jobId: string,
    notificationDetails: NotificationDetails,
    descriptionOfTheWaste: DescriptionOfTheWaste,
    collection: Collection,
    dropOff: DropOff,
    wastePhotos: WasteImage[]

}