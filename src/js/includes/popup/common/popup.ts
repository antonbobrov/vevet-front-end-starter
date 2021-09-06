import { PopupModule } from 'vevet';
import processPopupEvents from './processPopupEvents';

const popup = new PopupModule({
    duration: 350,
    levels: 1,
});
export default popup;

processPopupEvents({
    instance: popup,
});
