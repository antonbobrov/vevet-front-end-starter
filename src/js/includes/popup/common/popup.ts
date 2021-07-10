import { PopupModule } from 'vevet';
import { processPopupEvents } from './processPopupEvents';

export const popup = new PopupModule({
    duration: 350,
    levels: 1,
});
processPopupEvents({
    instance: popup,
});
