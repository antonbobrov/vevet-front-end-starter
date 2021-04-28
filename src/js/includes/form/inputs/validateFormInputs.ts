import { selectAll } from 'vevet-dom';
import validateFormLength from './validateFormLength';
import validateFormEmail from './validateFormEmail';
import validateFormTelephone from './validateFormTelephone';
import { IAjaxFormElements } from '../types';

export default function valdateFormInputs (
    formOuter: HTMLElement,
): IAjaxFormElements {

    const formElements: IAjaxFormElements[] = [];

    // length
    const inputs = selectAll('input, textarea', formOuter);
    inputs.forEach((input) => {
        if (input instanceof HTMLInputElement || input instanceof HTMLTextAreaElement) {
            formElements.push(validateFormLength(input, formOuter));
        }
    });

    // email
    const emailInputs = selectAll("input[type='email']", formOuter);
    emailInputs.forEach((input) => {
        if (input instanceof HTMLInputElement) {
            formElements.push(validateFormEmail(input, formOuter));
        }
    });

    // telephone
    const telephoneInputs = selectAll("input[type='tel']", formOuter);
    telephoneInputs.forEach((input) => {
        if (input instanceof HTMLInputElement) {
            formElements.push(validateFormTelephone(input));
        }
    });

    return {
        destroy: () => {
            formElements.forEach((el) => {
                el.destroy();
            });
        },
    };

}
