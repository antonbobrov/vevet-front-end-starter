import { selectAll } from 'vevet-dom';
import { setLoadingIndicator } from '../../layout/loading/indicator';

interface PopupButton extends HTMLElement {
    popupProceededClick: boolean;
}

export function setPopupButtons (
    outer: false | Element = false,
) {

    // set click on popup buttons
    const buttons = selectAll('.js-popup-button', !outer ? undefined : outer) as NodeListOf<PopupButton>;
    buttons.forEach((button) => {

        const popupSelector = button.getAttribute('data-popup-selector');
        const popupType = button.getAttribute('data-popup-type') || 'auto';

        if (popupSelector) {
            if (typeof button.popupProceededClick === 'undefined') {

                button.addEventListener('click', (e) => {
                    e.preventDefault();
                    e.stopPropagation();
                    loadPopup(popupSelector, popupType);
                });
                button.popupProceededClick = true;

            }
        }

    });

}



function loadPopup (
    popupSelector: string,
    popupType: string,
) {

    setLoadingIndicator(true);
    if (popupType === 'auto' || popupType.includes('auto ')) {
        import('./auto/popupAuto').then((module) => {
            module.openAutoPopup(`${popupSelector}`, popupType.split(' '));
        });
    }
    else {
        import('./common/popup').then((module) => {
            module.popup.show({
                selector: popupSelector,
                types: popupType.split(' '),
                append: true,
            });
        });
    }
    setLoadingIndicator(false);

}
