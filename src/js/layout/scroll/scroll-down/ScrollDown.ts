import { LitElement, customElement } from 'lit-element';
import app from '../../../app/app';
import { scrollTo } from '../scrollTo';

const prefix = 'scroll-down';


@customElement(prefix)
export default class ScrollDown extends LitElement {
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
            scrollTo(app.viewport.size[1] + 1);
        });
    }
}
