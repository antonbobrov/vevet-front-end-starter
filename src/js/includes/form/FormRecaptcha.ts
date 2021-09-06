import { customElement, property } from 'lit-element';
import VevetLitElement from '../../app/VevetLitElement';

const tagName = 'form-recaptcha';

declare global {
    interface Window {
        ReCaptchaKey: string;
        grecaptcha: any;
    }
}



@customElement(tagName)
export default class FormRecaptcha extends VevetLitElement {
    @property({
        attribute: 'captcha-theme',
    }) theme: 'dark' | 'light' = 'light'

    protected _id: any;

    protected _connectedCallback () {
        super._connectedCallback();
        this.classList.add(tagName);
        this.classList.add('js-no-custom-cursor');

        if (typeof this._id === 'undefined') {
            if (typeof window.grecaptcha !== 'undefined') {
                this._id = window.grecaptcha.render(
                    this,
                    {
                        sitekey: window.ReCaptchaKey,
                        theme: this.theme,
                        // callback: this._verify.bind(this),
                    },
                );
            }
        } else {
            this.reset();
        }
    }


    public reset () {
        if (typeof window.grecaptcha !== 'undefined') {
            window.grecaptcha.reset(this._id);
        }
    }


    // protected _verify (
    //     response: any,
    // ) {
    //     alert(response);
    // }
}
