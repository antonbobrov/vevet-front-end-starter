import { customElement, LitElement, property } from 'lit-element';
import { FormModule, ScrollModule } from 'vevet';
import {
    isElement, selectOne, selectAll, addEventListener,
} from 'vevet-dom';
import { isCustomScroll } from '../../layout/scroll/custom-scroll/isCustomScroll';
import { getScrollSelector } from '../../layout/scroll/custom-scroll/settings';
import { scrollToTop } from '../../layout/scroll/scrollTo';
import { createSelectElements } from './inputs/createSelectElements';
import valdateFormInputs from './inputs/validateFormInputs';
import { IAjaxFormElements } from './types';
import './FormRecaptcha';
import { FormRecaptcha, tagName as formRecaptchaTagName } from './FormRecaptcha';
import { updateThings } from '../../app/updateThings';

const $ = require('jquery');



const tagName = 'ajax-form';

declare global {
    interface Window {
        updateThingsCallback: () => void;
    }
}



@customElement(tagName)
export class AjaxForm extends LitElement {

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
    }) scrollToTopOnSuccess = '';



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
     protected _formInputsValidation: IAjaxFormElements;
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
        }
        else {
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
        this._formInputsValidation = valdateFormInputs(this._formElement);
        // crete custom select elements
        this._selectinputs = createSelectElements(this);

        // observe errors changes
        this._observeErrors();

        // set events on success
        this._setOnSuccess();
        // set events on failure
        this._setOnFail();

        // set reverse z-index for elements
        const children = this.querySelectorAll('form > *');
        for (let i = children.length - 1, z = 0; i >= 0; i--, z++) {
            const el = children[i] as HTMLElement;
            el.style.zIndex = z.toString();
        }

    }

    /**
     * Observe form errors
     */
    protected _observeErrors () {

        // get errors
        const errors = selectAll('.v-form__error, .v-form__errors, .v-form__message', this._formElement);
        errors.forEach((error) => {

            // config object
            const config = {
                childList: true,
            };

            // instantiating observer
            const observer = new MutationObserver((mutations) => {
                mutations.forEach(() => {
                    if (error.classList.contains('show')) {
                        $(error).stop().delay(100).slideDown(350);
                    }
                    else {
                        $(error).stop().delay(100).slideUp(350);
                    }
                });
            });
            observer.observe(error, config);
            this._mutationObservers.push(observer);

        });

    }

    /**
     * Set form events on failure
     */
    protected _setOnFail () {

        if (!this.form) {
            return;
        }

        this.form.on('failure', () => {
            this._resetRecaptcha();
        });

    }

    /**
     * Set form events on success
     */
    protected _setOnSuccess () {

        if (!this.form) {
            return;
        }

        this.form.on('success', () => {

            this._resetRecaptcha();

            // scroll to top on success
            if (this.scrollToTopOnSuccess) {
                scrollToTop().then(() => {
                    this._handleSuccess();
                    const scrollSelector = getScrollSelector();
                    if (isCustomScroll(scrollSelector)) {
                        const scroll = scrollSelector as ScrollModule;
                        scroll.setSize(true);
                    }
                });
            }
            else {
                this._handleSuccess();
            }

        });

    }

    /**
     * Actions on form success
     */
    protected _handleSuccess () {

        // open popup if exists
        if (this.popupOnSuccess) {
            import('../popup/auto/popupAuto').then((module) => {
                const popup = module.popupAuto;
                if (popup.shown) {
                    popup.on('hidden', () => {
                        module.openAutoPopup(this.popupOnSuccess);
                    }, {
                        once: true,
                    });
                    popup.hide();
                }
                else {
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
                    if ('updateThingsCallback' in window) {
                        window.updateThingsCallback();
                    }
                    updateThings();
                }, {
                    once: true,
                });
            });

        }

        // update things
        if ('updateThingsCallback' in window) {
            window.updateThingsCallback();
            updateThings();
        }

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

        const recaptchaEl = selectAll(formRecaptchaTagName, this) as NodeListOf<FormRecaptcha>;
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

        if (this._formInputsValidation) {
            this._formInputsValidation.destroy();
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
