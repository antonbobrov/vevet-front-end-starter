import { customElement, LitElement } from 'lit-element';

const tagName = 'lazy-img';

@customElement(tagName)
export class LazyImg extends LitElement {

    createRenderRoot () {
        return this;
    }

    connectedCallback () {

        super.connectedCallback();

        this.classList.add(tagName);

        const { children } = this;
        for (let i = 0; i < children.length; i++) {
            const child = children[i];
            if (child instanceof HTMLImageElement) {
                child.classList.add('lazy-image');
            }
        }

    }

}
