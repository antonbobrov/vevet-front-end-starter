import { addEventListener, IAddEventListener, selectAll } from 'vevet-dom';
import { IAjaxFormElements } from './types';

/**
 * @param name - Get input by its name
 */
export function getFormInputsByName (
    name: string,
    outer: false | Element,
) {
    const inputs: (
        HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    )[] = [];

    // get all elements by name
    const elements = selectAll(`*[name="${name}"]`, outer || undefined);
    elements.forEach((input) => {
        if (
            input instanceof HTMLInputElement
            || input instanceof HTMLTextAreaElement
            || input instanceof HTMLSelectElement
        ) {
            inputs.push(input);
        }
    });

    return inputs;
}



export interface IOnFormInputChangeArg {
    name: string;
    value: string;
}

/**
 * Events on input change
 */
export function onFormInputChange (
    /**
     * Name of the input
     */
    name: string,
    /**
     * Callback action
     */
    callback: (obj: IOnFormInputChangeArg) => void,
    /**
     * HTML outer
     */
    outer: false | Element = false,
): IAjaxFormElements {
    const listeners: IAddEventListener[] = [];

    // get all elements by name
    const elements = getFormInputsByName(name, outer);
    elements.forEach((input) => {
        if (input instanceof HTMLInputElement && input.type === 'radio') {
            listeners.push(addEventListener(input, 'change', () => {
                if (input.checked) {
                    callback({
                        name: input.name,
                        value: input.value,
                    });
                }
            }));
        } else {
            listeners.push(addEventListener(input, 'change', () => {
                callback({
                    name: input.name,
                    value: input.value,
                });
            }));
        }
    });

    return {
        destroy: () => {
            listeners.forEach((listener) => {
                listener.remove();
            });
        },
    };
}



/**
 * Get value of the input
 */
export function getFormInputValue (
    /**
     * Name of the input
     */
    name: string,
    /**
     * HTML outer
     */
    outer: false | Element = false,
) {
    // get all elements by name
    const elements = getFormInputsByName(name, outer);
    for (let i = 0; i < elements.length; i++) {
        const input = elements[i];
        if (input instanceof HTMLInputElement && input.type === 'radio') {
            if (input.checked) {
                return input.value;
            }
        } else if (input instanceof HTMLInputElement && input.type === 'checkbox') {
            if (input.checked) {
                return input.value;
            }
        } else {
            return input.value;
        }
    }

    return '';
}



/**
 * Get value of the input
 */
export function setFormInputValue (
    /**
     * Name of the input
     */
    name: string,
    /**
     * Value of the input
     */
    value: string,
    /**
     * HTML outer
     */
    outer: false | Element = false,
) {
    // get all elements by name
    const elements = getFormInputsByName(name, outer);
    for (let i = 0; i < elements.length; i++) {
        const input = elements[i];
        if (input instanceof HTMLSelectElement) {
            const { options } = input;
            for (let index = 0; index < options.length; index++) {
                if (options[index].value === value) {
                    input.selectedIndex = index;
                }
            }
        } else if (input instanceof HTMLInputElement && (input.type === 'checkbox' || input.type === 'radio')) {
            if (input.value === value) {
                input.checked = true;
            }
        } else {
            input.value = value;
        }

        input.dispatchEvent(new Event('change'));
    }

    return '';
}
