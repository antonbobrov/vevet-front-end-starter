import { selectAll } from 'vevet-dom';
import createInputEmailValidator from './email';
import createInputLengthValidator from './length';
import createInputTelephoneValidator from './telephone';
import { IAjaxFormElements } from './types';

export default function createLiveFormValidation (
    parent: Element,
): IAjaxFormElements {

    const validators: IAjaxFormElements[] = [];

    // length
    const inputs = selectAll('input, textarea', parent);
    inputs.forEach((input) => {
        if (input instanceof HTMLInputElement || input instanceof HTMLTextAreaElement) {
            validators.push(createInputLengthValidator({
                input,
            }));
        }
    });

    // email
    const emailInputs = selectAll("input[type='email']", parent);
    emailInputs.forEach((input) => {
        if (input instanceof HTMLInputElement) {
            validators.push(createInputEmailValidator({
                input,
            }));
        }
    });

    // telephone
    const telephoneInputs = selectAll("input[type='tel']", parent);
    telephoneInputs.forEach((input) => {
        if (input instanceof HTMLInputElement) {
            validators.push(createInputTelephoneValidator({
                input,
            }));
        }
    });

    return {
        destroy: () => {
            validators.forEach((validator) => {
                validator.destroy();
            });
        },
    };

}
