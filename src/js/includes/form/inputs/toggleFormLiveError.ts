import { selectOne, isElement } from 'vevet-dom';

const $ = require('jquery');

export default function toggleFormLiveError (
    name: string,
    showBool: boolean,
    formOuter: HTMLElement,
) {

    const errorLiveElement = selectOne(
        `.v-form__live-error[for='${name}']`,
        formOuter,
    );
    const errorElement = selectOne(
        `.v-form__error[for='${name}']`,
        formOuter,
    );

    if (isElement(errorLiveElement)) {
        if (isElement(errorElement)) {
            errorElement.classList.remove('show');
            $(errorElement).stop().delay(100).slideUp(350);
        }
        if (showBool) {
            errorLiveElement.classList.add('show');
            $(errorLiveElement).stop().delay(100).slideDown(350);
        }
        else {
            errorLiveElement.classList.remove('show');
            $(errorLiveElement).stop().delay(100).slideUp(350);
        }
    }

}
