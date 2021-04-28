import { PopupModule } from 'vevet';
import app from '../../../app/app';
import { pageAjax } from '../../../pages/pageAjax';
import { setMediaPopupSize } from './setMediaPopupSize';

const adaptivePopupSize = true;



// create the popup
export const mediaPopup = new PopupModule();



// hide the popup on page change
pageAjax.on('prepare', () => {
    mediaPopup.hide();
});

// set escape key event
window.addEventListener('keyup', (e: KeyboardEvent) => {
    if (e.keyCode === 27) {
        mediaPopup.hide();
    }
});



// prevent beneath-scrolling
mediaPopup.on('show', () => {
    app.html.classList.add('prevent-scroll-under-popup');
});
mediaPopup.on('hide', () => {
    app.html.classList.remove('prevent-scroll-under-popup');
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
