import { PopupModule } from 'vevet';
import { processPopupEvents } from '../common/processPopupEvents';
import { popup } from '../common/popup';

export const popupAuto = new PopupModule({
    duration: 350,
});
processPopupEvents({
    instance: popupAuto,
    appendCloseToLevels: true,
});



export function openAutoPopup (
    selector: string,
    types: string[] = ['auto'],
) {

    if (popup.shown) {
        popup.hide();
    }

    popupAuto.show({
        selector,
        types,
        append: true,
    });

}
