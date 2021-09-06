import { LitElement, customElement } from 'lit-element';
import { timeoutCallback } from 'vevet';
import { hidePage, showPage } from '../../../pages/pageStates';
import app from '../../../app/app';
import { scrollToTop } from '../scrollTo';
import { enableTabIndex } from '../keyboard/tabindex';
import setEnterClickListener from '../../../helpers/listeners/setEnterClickListener';

const prefix = 'scroll-to-top';


@customElement(prefix)
export default class ScrollToTop extends LitElement {
    createRenderRoot () {
        return this;
    }

    connectedCallback () {
        super.connectedCallback();

        // add component class
        this.classList.add(prefix);
    }

    firstUpdated () {
        this.addEventListener('click', () => {
            this._handleClick();
        });

        // enable tab events
        enableTabIndex(this);
        setEnterClickListener(this, () => {
            this._handleClick();
        });
    }

    protected _handleClick () {
        let shouldHidePage = false;
        const page = app.vevetPage;
        if (page) {
            if (page.name === 'home-page') {
                shouldHidePage = true;
            }
        }

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
    }
}
