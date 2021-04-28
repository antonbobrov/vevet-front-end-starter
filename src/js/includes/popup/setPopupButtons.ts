import { selectAll } from 'vevet-dom';
import { setLoadingIndicator } from '../../layout/loading/indicator';

export function setPopupButtons (
    outer: false | Element = false,
) {

    // set click on popup buttons
    const buttons = selectAll('.js-open-popup', !outer ? undefined : outer);
    buttons.forEach((button) => {
        const popupID = button.getAttribute('data-popup');
        if (popupID) {
            // @ts-ignore
            if (typeof button['popup-proceeded'] === 'undefined') {
                button.addEventListener('click', (e) => {
                    e.preventDefault();
                    e.stopPropagation();
                    loadPopup(popupID);
                });
                // @ts-ignore
                button['popup-proceeded'] = true;
            }
        }
    });

}



function loadPopup (
    popupID: string,
) {

    setLoadingIndicator(true);
    import('./auto/openAutoPopup').then((module) => {
        module.default(`${popupID}`);
    });
    setLoadingIndicator(false);

}
