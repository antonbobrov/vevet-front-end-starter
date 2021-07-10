import { PopupModule } from 'vevet';
import app from '../../../app/app';
import { processPopupEvents } from '../../popup/common/processPopupEvents';
import { setMediaPopupSize } from './setMediaPopupSize';

const adaptivePopupSize = true;



// create the popup
export const mediaPopup = new PopupModule();
processPopupEvents({
    instance: mediaPopup,
    appendCloseToLevels: true,
});

mediaPopup.on('created', () => {
    if (mediaPopup.outer) {
        mediaPopup.outer.classList.add('js-no-custom-cursor');
    }
});



// set sizes of the popup's container
if (adaptivePopupSize) {

    mediaPopup.on('show', () => {
        setSize();
        setTimeout(() => {
            setSize();
        }, 50);
    });

    app.viewport.on('', setSize.bind(this), {
        name: 'Align Media Popup',
    });

}

function setSize () {
    if (mediaPopup.outer) {
        setMediaPopupSize(mediaPopup.outer);
    }
}
