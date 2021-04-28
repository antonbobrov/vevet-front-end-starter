import { PopupModule } from 'vevet';
import { selectAll } from 'vevet-dom';
import app from '../../../app/app';
import { pageAjax } from '../../../pages/pageAjax';
import { setPopupButtons } from '../setPopupButtons';



declare global {
    interface Window {
        updateThingsCallback: () => void;
    }
}



const popupAuto = new PopupModule({});

popupAuto.on('shownLevel', () => {
    pageAjax.setLinks();
    setPopupButtons(popupAuto.outer);
    setPopupCloseButtons();
    // update things
    if ('updateThingsCallback' in window) {
        window.updateThingsCallback();
    }
});

popupAuto.on('show', () => {
    app.html.classList.add('prevent-scroll-under-popup');
});

popupAuto.on('hide', () => {
    app.html.classList.remove('prevent-scroll-under-popup');
});



pageAjax.on('prepare', () => {
    popupAuto.hide();
});

window.addEventListener('keyup', (e: KeyboardEvent) => {
    if (e.keyCode === 27) {
        popupAuto.hideAll();
    }
});



function setPopupCloseButtons () {

    const back = selectAll('.js-popup-back', popupAuto.outer || undefined);
    back.forEach((el) => {
        // @ts-ignore
        if (typeof el['popup-proceeded'] === 'undefined') {
            el.addEventListener('click', () => {
                popupAuto.hide();
            });
            // @ts-ignore
            el['popup-proceeded'] = true;
        }
    });

    const close = selectAll('.js-popup-close', popupAuto.outer || undefined);
    close.forEach((el) => {
        // @ts-ignore
        if (typeof el['popup-proceeded'] === 'undefined') {
            el.addEventListener('click', () => {
                popupAuto.hideAll();
            });
            // @ts-ignore
            el['popup-proceeded'] = true;
        }
    });


}



export default popupAuto;
