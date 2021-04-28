import { addEventListener } from 'vevet-dom';
import toggleFormLiveError from './toggleFormLiveError';
import toggleFormInputError from './toggleFormInputError';
import { IAjaxFormElements } from '../types';

const validator = require('email-validator');

export default function validateFormEmail (
    input: HTMLInputElement,
    formOuter: HTMLElement,
): IAjaxFormElements {

    const listener = addEventListener(input, 'keyup', () => {
        const { value } = input;
        if (value.length > 2) {
            if (validator.validate(value)) {
                toggleFormInputError(input, false);
                toggleFormLiveError(input.name, false, formOuter);
            }
            else {
                toggleFormInputError(input, true);
                toggleFormLiveError(input.name, true, formOuter);
            }
        }
        else {
            toggleFormInputError(input, true);
            toggleFormLiveError(input.name, true, formOuter);
        }
    });

    return {
        destroy: () => {
            listener.remove();
        },
    };

}
