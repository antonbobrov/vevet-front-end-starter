import { PopupModule } from 'vevet';
import { selectAll } from 'vevet-dom';
import app from '../../../app/app';
import { updateThings } from '../../../app/updateThings';
import { pageAjax } from '../../../pages/pageAjax';
import loadAjaxForm from '../../form/loadAjaxForm';
import { setPopupButtons } from '../setPopupButtons';

interface Data {
    instance: PopupModule;
    appendCloseToLevels?: boolean;
}

declare global {
    interface Window {
        updateThingsCallback: () => void;
    }
}

export function processPopupEvents ({
    instance,
    appendCloseToLevels = false,
}: Data) {



    // animation states
    instance.on('show', () => {
        if (instance.outer) {
            instance.outer.classList.add('show');
        }
    }, {
        timeout: 125,
    });
    instance.on('hidden', () => {
        if (instance.outer) {
            instance.outer.classList.remove('show');
        }
    });



    // append close button to levels
    if (appendCloseToLevels) {
        if (instance.created) {
            appendCloseToLevelsFunc();
        }
        else {
            instance.on('created', () => {
                appendCloseToLevelsFunc();
            });
        }
    }

    function appendCloseToLevelsFunc () {
        if (!!instance.closeButton && !!instance.levelsOuter) {
            instance.levelsOuter.appendChild(instance.closeButton);
        }
    }



    // update things
    instance.on('shownLevel', () => {
        pageAjax.setLinks();
        setPopupButtons(instance.outer);
        setPopupCloseButtons();
        loadAjaxForm();
        // update things
        if ('updateThingsCallback' in window) {
            window.updateThingsCallback();
        }
        updateThings();
    });



    // prevent scrolling under popup
    instance.on('show', () => {
        app.html.classList.add('prevent-scroll-under-popup');
    });
    instance.on('hide', () => {
        app.html.classList.remove('prevent-scroll-under-popup');
    });



    // hiding the popup on page change
    pageAjax.on('prepare', () => {
        instance.hide();
    });

    // hiding the popup on keyboard event
    window.addEventListener('keyup', (e: KeyboardEvent) => {
        if (e.keyCode === 27) {
            instance.hide();
        }
    });



    function setPopupCloseButtons () {

        const back = selectAll('.js-popup-back', instance.outer || undefined);
        back.forEach((el) => {
            // @ts-ignore
            if (typeof el['popup-proceeded'] === 'undefined') {
                el.addEventListener('click', () => {
                    instance.hide();
                });
                // @ts-ignore
                el['popup-proceeded'] = true;
            }
        });

        const close = selectAll('.js-popup-close', instance.outer || undefined);
        close.forEach((el) => {
            // @ts-ignore
            if (typeof el['popup-proceeded'] === 'undefined') {
                el.addEventListener('click', () => {
                    instance.hideAll();
                });
                // @ts-ignore
                el['popup-proceeded'] = true;
            }
        });


    }



}
