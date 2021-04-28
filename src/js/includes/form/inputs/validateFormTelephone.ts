import Inputmask from 'inputmask';
import intlTelInput, { Plugin } from 'intl-tel-input';
import {
    addEventListener, IAddEventListener, parentByClassName, selectOne,
} from 'vevet-dom';
import { IAjaxFormElements } from '../types';
import { loadScript } from '../../../helpers/loaders/loadScript';

const errorClassName = 'error';


export default function validateFormTelephone (
    input: HTMLInputElement,
): IAjaxFormElements {

    let phoneInput: Plugin | false = false;
    let listeners: IAddEventListener[] = [];
    let classNamesObserver: MutationObserver | false = false;

    // create the international telephone input
    const countryCode = '';
    loadScript('https://cdnjs.cloudflare.com/ajax/libs/intl-tel-input/16.0.8/js/utils.js').then(() => {

        phoneInput = intlTelInput(input, {
            utilsScript: 'https://cdnjs.cloudflare.com/ajax/libs/intl-tel-input/16.0.8/js/utils.js',
            initialCountry: countryCode,
            autoPlaceholder: 'polite',
            separateDialCode: true,
            preferredCountries: ['de', 'us', 'ru'],
        });

        // update telephone code
        const phoneCodeAttr = input.getAttribute('data-telephone-code');
        if (phoneCodeAttr) {
            const phoneCodeInput = selectOne(phoneCodeAttr) as HTMLInputElement;
            if (phoneCodeInput) {
                phoneCodeInput.value = `+${phoneInput.getSelectedCountryData().dialCode}`;
                input.addEventListener('countrychange', () => {
                    if (phoneInput) {
                        phoneCodeInput.value = `+${phoneInput.getSelectedCountryData().dialCode}`;
                    }
                });
            }
        }

        // update telephone mask
        createMask();
        input.addEventListener('countrychange', () => {
            input.value = '';
            createMask();
        });

        // disable scroll
        input.parentElement.addEventListener('wheel', (e) => {
            e.stopPropagation();
        });

    });



    /**
     * Create the telephone mask
     */
    function createMask () {

        const placeholder = input.getAttribute('placeholder');
        let mask = '';
        if (placeholder) {
            mask = placeholder.replace(/[0-9]/g, '9');
        }

        // create InputMask
        Inputmask({
            mask: [mask],
            showMaskOnHover: !1,
        }).mask(input);

        // update mask input
        const phoneMaskAttr = input.getAttribute('data-telephone-mask');
        if (phoneMaskAttr) {
            const phoneMaskInput = selectOne(phoneMaskAttr) as HTMLInputElement;
            if (phoneMaskInput) {
                phoneMaskInput.value = mask;
            }
        }

        // set listeners to trace errors
        destroyListeners();
        listeners.push(addEventListener(input, 'keyup', () => {
            testMask(mask);
        }));
        listeners.push(addEventListener(input, 'change', () => {
            testMask(mask);
        }));

        // set class names observer
        classNamesObserver = new MutationObserver((mutations) => {
            const parent = parentByClassName(input, 'iti--separate-dial-code');
            if (parent) {
                mutations.forEach(() => {
                    if (input.classList.contains(errorClassName)) {
                        parent.classList.add(errorClassName);
                    }
                    else {
                        parent.classList.remove(errorClassName);
                    }
                });
            }
        });
        classNamesObserver.observe(input, {
            attributes: true,
        });

    }

    function testMask (
        mask: string,
    ) {

        const test = new RegExp(`${mask.replace(/9/g, '\\d')}`, 'g');

        if (!test.test(input.value)) {
            input.classList.add(errorClassName);
        }
        else {
            input.classList.remove(errorClassName);
        }

    }



    function destroyListeners () {

        listeners.forEach((listener) => {
            listener.remove();
        });
        listeners = [];

        if (classNamesObserver) {
            classNamesObserver.disconnect();
            classNamesObserver = false;
        }

    }



    return {
        destroy: () => {
            if (phoneInput) {
                phoneInput.destroy();
            }
            destroyListeners();
        },
    };

}
