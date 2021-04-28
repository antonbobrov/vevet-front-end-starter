import { addEventListener, IAddEventListener } from 'vevet-dom';
import { IAjaxFormElements } from '../types';
import toggleFormInputError from './toggleFormInputError';
import toggleFormLiveError from './toggleFormLiveError';

export default function validateFormLength (
    input: HTMLInputElement | HTMLTextAreaElement,
    formOuter: HTMLElement,
): IAjaxFormElements {

    const listeners: IAddEventListener[] = [];
    const { minLength, maxLength } = input;

    listeners.push(addEventListener(input, 'keyup', () => {
        change();
    }));
    listeners.push(addEventListener(input, 'change', () => {
        change();
    }));

    function change () {
        if (!checkLength()) {
            toggleFormInputError(input, true);
            toggleFormLiveError(input.name, true, formOuter);
        }
        else {
            toggleFormInputError(input, false);
            toggleFormLiveError(input.name, false, formOuter);
        }
    }

    function checkLength () {
        const { value } = input;
        let success = true;
        if (minLength !== -1) {
            if (value.length < minLength) {
                success = false;
            }
        }
        if (maxLength !== -1) {
            if (value.length > maxLength) {
                success = false;
            }
        }
        return success;
    }

    return {
        destroy: () => {
            listeners.forEach((listener) => {
                listener.remove();
            });
        },
    };

}
