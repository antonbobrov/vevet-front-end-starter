import { LitElement, customElement } from 'lit-element';
import { timeoutCallback } from 'vevet';
import { hidePage, showPage } from '../../../pages/pageStates';
import app from '../../../app/app';
import { scrollToTop } from '../scrollTo';

const prefix = 'scroll-to-top';


@customElement(prefix)
export class ScrollToTop extends LitElement {



    createRenderRoot () {
        return this;
    }

    connectedCallback () {

        super.connectedCallback();

        // add component class
        this.classList.add(prefix);

    }

    firstUpdated () {

        let shouldHidePage = false;
        const page = app.vevetPage;
        if (page) {
            if (page.name === 'home-page') {
                shouldHidePage = true;
            }
        }

        this.addEventListener('click', () => {
            let timeout = 0;
            if (shouldHidePage) {
                hidePage();
                timeout = 250;
            }
            timeoutCallback(() => {
                scrollToTop(500).then(() => {
                    showPage();
                });
            }, timeout);
        });

    }


}
