import { parentByClassName, selectOne } from 'vevet-dom';

export const formErrorClassName = 'error';
const vevetErrorInputOuterClassName = 'v-form__input_error';

interface Data {
    input: HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement;
    isError: boolean;
}



export function toggleFormInputError ({
    input,
    isError,
}: Data) {
    toggleFormLabelError({
        input,
        isError,
    });

    input.classList.toggle(formErrorClassName, isError);

    const vFormInput = parentByClassName(input, 'v-form__input');
    if (vFormInput) {
        vFormInput.classList.toggle(vevetErrorInputOuterClassName, isError);
    }
}



export function toggleFormLabelError ({
    input,
    isError,
}: Data) {
    const id = input.getAttribute('id');
    let label: false | Element = false;
    if (id) {
        label = selectOne(`label[for="${id}"]`);
    }

    if (label) {
        label.classList.toggle('error', isError);
    }
}
