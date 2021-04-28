const errorClassName = 'error';
const errorInputOuterClassName = 'v-form__input_live-error';
const vevetErrorInputOuterClassName = 'v-form__input_error';

export default function toggleFormInputError (
    input: HTMLElement,
    isError = false,
) {

    if (isError) {
        input.classList.add(errorClassName);
    }
    else {
        input.classList.remove(errorClassName);
    }

    const parent = input.parentElement;
    if (parent.classList.contains('v-form__input')) {
        if (isError) {
            parent.classList.add(errorInputOuterClassName);
            parent.classList.add(vevetErrorInputOuterClassName);
        }
        else {
            parent.classList.remove(errorInputOuterClassName);
            parent.classList.remove(vevetErrorInputOuterClassName);
        }
    }

}
