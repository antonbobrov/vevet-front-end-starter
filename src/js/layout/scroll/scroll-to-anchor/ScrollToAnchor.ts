import { LitElement, customElement, property } from 'lit-element';
import { selectOne } from 'vevet-dom';
import { scrollTo } from '../scrollTo';
import { getScrollSelector } from '../custom-scroll/settings';

const prefix = 'scroll-to-anchor';


@customElement(prefix)
export class ScrollToAnchor extends LitElement {

    @property({
        attribute: 'target-selector',
    }) targetSelector: string;
    @property({
        attribute: 'to-top',
    }) toTop: string;



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

            // get target element
            let targetEl: Element;
            if (this.targetSelector) {
                try {
                    targetEl = selectOne(this.targetSelector);
                }
                catch (e) {
                    //
                }
            }

            // top clamp
            const toTopVal = this.toTop ? parseFloat(this.toTop) : 0;

            // scroll to the element
            if (targetEl) {
                const scroll = getScrollSelector();
                const scrollToVal = scroll.scrollTop + targetEl.getBoundingClientRect().top + toTopVal;
                scrollTo(scrollToVal);
            }

        });

    }


}
