import { customElement, LitElement, property } from 'lit-element';
import { FormModule, ScrollModule } from 'vevet';
import {
    isElement, selectOne, selectAll, addEventListener,
} from 'vevet-dom';
import { isCustomScroll } from '../../layout/scroll/custom-scroll/isCustomScroll';
import { getScrollSelector } from '../../layout/scroll/custom-scroll/settings';
import { scrollToTop } from '../../layout/scroll/scrollTo';
import createCustomSelects from './inputs/customSelect';
import createLiveFormValidation from './inputs/createLiveFormValidation';
import { IAjaxFormElements } from './inputs/types';
import './FormRecaptcha';
import FormRecaptcha from './FormRecaptcha';
import updateThings from '../../app/updateThings';
import { toggleFormInputError } from './inputs/errors';



const tagName = 'ajax-form';

declare global {
    interface Window {
        updateThingsCallback: () => void;
    }
}



@customElement(tagName)
export default class AjaxForm extends LitElement {
    @property({
        attribute: 'popup-on-success',
    }) popupOnSuccess = '';

    @property({
        attribute: 'hide-on-success',
    }) hideOnSuccess = '';
    @property({
        attribute: 'show-on-success',
    }) showOnSuccess = '';

    @property({
        attribute: 'scroll-to-top-on-success',
        type: Boolean,
    }) scrollToTopOnSuccess: boolean;



    /**
     * Form module
     */
    protected _form: FormModule | false = false;
    get form () {
        return this._form;
    }

    /**
     * Form element
     */
    protected _formElement: HTMLFormElement | HTMLElement;

    /**
     * Form inputs validation
     */
     protected _validation: IAjaxFormElements;
     /**
      * Custom select inputs
      */
    protected _selectinputs: IAjaxFormElements;
    /**
     * Mutation observers
     */
    protected _mutationObservers: MutationObserver[] = [];



    createRenderRoot () {
        return this;
    }

    connectedCallback () {
        super.connectedCallback();
        this.classList.add(tagName);

        this._create();
    }

    disconnectedCallback () {
        super.disconnectedCallback();

        this._destroy();
    }



    /**
     * Create the form
     */
    protected _create () {
        if (this._form) {
            return;
        }

        const formEl = selectOne('form', this) as HTMLFormElement;
        if (isElement(formEl)) {
            this._formElement = formEl;
        } else {
            this._formElement = this;
        }

        // create a form
        this._form = new FormModule({
            selectors: {
                form: this._formElement as HTMLFormElement,
            },
            clearAfterSuccess: true,
        });

        // validate inputs
        this._validation = createLiveFormValidation(this._formElement as HTMLFormElement);
        // crete custom select elements
        this._selectinputs = createCustomSelects(this);

        // set events on failure
        this._setFailEvents();
        // set events on success
        this._setSuccessEvents();

        // set reverse z-index for elements
        const children = this.querySelectorAll('form > *');
        for (let i = children.length - 1, z = 0; i >= 0; i--, z++) {
            const el = children[i] as HTMLElement;
            el.style.zIndex = z.toString();
        }
    }

    /**
     * Set form events on failure
     */
    protected _setFailEvents () {
        if (!this.form) {
            return;
        }

        this.form.on('failure', (data) => {
            this._resetRecaptcha();

            // reset form errors
            const inputs = selectAll(
                'input, select, textarea', this,
            ) as NodeListOf<HTMLInputElement|HTMLSelectElement|HTMLTextAreaElement>;
            inputs.forEach((input) => {
                let isError = false;
                data.errors.forEach((error) => {
                    if (error.key === input.name) {
                        isError = true;
                    }
                });
                toggleFormInputError({
                    input,
                    isError,
                });
            });
        });
    }

    /**
     * Set form events on success
     */
    protected _setSuccessEvents () {
        if (!this.form) {
            return;
        }

        this.form.on('success', () => {
            this._resetRecaptcha();

            // scroll to top on success
            if (this.scrollToTopOnSuccess) {
                scrollToTop().then(() => {
                    this._handleSuccess();
                });
            } else {
                this._handleSuccess();
            }

            // reset form errors
            const inputs = selectAll(
                'input, select, textarea', this,
            ) as NodeListOf<HTMLInputElement|HTMLSelectElement|HTMLTextAreaElement>;
            inputs.forEach((input) => {
                toggleFormInputError({
                    input,
                    isError: false,
                });
            });
        });
    }

    /**
     * Actions on form success
     */
    protected _handleSuccess () {
        // open popup if exists
        if (this.popupOnSuccess) {
            import('../popup/auto/popupAuto').then((module) => {
                const popup = module.default;
                if (popup.shown) {
                    popup.on('hidden', () => {
                        module.openAutoPopup(this.popupOnSuccess);
                    }, {
                        once: true,
                    });
                    popup.hide();
                } else {
                    module.openAutoPopup(this.popupOnSuccess);
                }
            });
        }

        // hide elements on success
        const hideEl = this.hideElementOnSuccess;
        if (hideEl) {
            hideEl.style.display = 'none';
        }

        // show elements on success
        const showEl = this.showElementOnSuccess;
        if (showEl) {
            showEl.style.display = 'block';

            // process back buttons
            const backButtons = selectAll('*[data-back]', showEl);
            backButtons.forEach((button) => {
                addEventListener(button, 'click', () => {
                    if (showEl) {
                        showEl.style.display = 'none';
                    }
                    if (hideEl) {
                        hideEl.style.display = '';
                    }
                    updateThings.launchCallbacks();
                }, {
                    once: true,
                });
            });
        }

        // update scroll sizes
        const scrollSelector = getScrollSelector();
        if (isCustomScroll(scrollSelector)) {
            const scroll = scrollSelector as ScrollModule;
            scroll.setSize(true);
        }

        // update things
        updateThings.launchCallbacks();
    }

    get hideElementOnSuccess () {
        if (this.hideOnSuccess) {
            const el = selectOne(this.hideOnSuccess) as HTMLElement;
            if (el) {
                return el;
            }
        }
        return false;
    }

    get showElementOnSuccess () {
        if (this.showOnSuccess) {
            const el = selectOne(this.showOnSuccess) as HTMLElement;
            if (el) {
                return el;
            }
        }
        return false;
    }



    /**
     * Reset recaptcha
     */
    protected _resetRecaptcha () {
        const recaptchaEl = selectAll(
            'form-recaptcha', this,
        ) as unknown as NodeListOf<FormRecaptcha>;
        recaptchaEl.forEach((el) => {
            el.reset();
        });
    }



    /**
     * Destroy the form
     */
    protected _destroy () {
        if (this._form) {
            this._form.destroy();
            this._form = false;
        }

        if (this._validation) {
            this._validation.destroy();
        }

        if (this._selectinputs) {
            this._selectinputs.destroy();
        }

        this._mutationObservers.forEach((observer) => {
            observer.disconnect();
        });
        this._mutationObservers = [];
    }
}
