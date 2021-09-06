import { addEventListener, IAddEventListener } from 'vevet-dom';
import { toggleFormInputError } from './errors';
import { IAjaxFormElements } from './types';

interface Data {
    input: HTMLInputElement | HTMLTextAreaElement,
}

export default function createInputLengthValidator ({
    input,
}: Data): IAjaxFormElements {

    const listeners: IAddEventListener[] = [];
    const { minLength, maxLength } = input;

    listeners.push(addEventListener(input, 'keyup', () => {
        change();
    }));
    listeners.push(addEventListener(input, 'change', () => {
        change();
    }));

    function change () {
        const isValid = checkLength();
        toggleFormInputError({
            input,
            isError: !isValid,
        });
    }

    function checkLength () {
        const { value } = input;
        let isValid = true;
        if (minLength !== -1) {
            if (value.length < minLength) {
                isValid = false;
            }
        }
        if (maxLength !== -1) {
            if (value.length > maxLength) {
                isValid = false;
            }
        }
        return isValid;
    }

    return {
        destroy: () => {
            listeners.forEach((listener) => {
                listener.remove();
            });
        },
    };

}
