import { addEventListener, IAddEventListener } from 'vevet-dom';
import { toggleFormInputError } from './errors';
import { IAjaxFormElements } from './types';

const validator = require('email-validator');

interface Data {
    input: HTMLInputElement,
}

export default function createInputEmailValidator ({
    input,
}: Data): IAjaxFormElements {
    const listeners: IAddEventListener[] = [];

    listeners.push(addEventListener(input, 'keyup', () => {
        checkValidity();
    }));

    listeners.push(addEventListener(input, 'blur', () => {
        checkValidity();
    }));

    function checkValidity () {
        const { value } = input;
        const isValid = validator.validate(value);
        toggleFormInputError({
            input,
            isError: !isValid,
        });
    }

    return {
        destroy: () => {
            listeners.forEach((listener) => {
                listener.remove();
            });
        },
    };
}
