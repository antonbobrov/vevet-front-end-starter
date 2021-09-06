import { customElement, LitElement } from 'lit-element';
import { createElement, insertAfter, selectAll } from 'vevet-dom';

const tagName = 'text-content';

@customElement(tagName)
export default class TextContent extends LitElement {
    createRenderRoot () {
        return this;
    }



    connectedCallback () {
        super.connectedCallback();
        this.classList.add(tagName);

        this._processIframes();
        this._processVideos();
        this._processImages();
    }



    /**
     * Wrap iframes
     */
    protected _processIframes () {
        const parentClassName = `${tagName}__iframe`;

        const elements = selectAll('iframe', this);
        elements.forEach((el) => {
            const parent = el.parentElement;
            if (!parent.classList.contains(parentClassName)) {
                const outer = createElement('div', {
                    class: parentClassName,
                });
                insertAfter(outer, el);
                outer.appendChild(el);
            }
        });
    }

    /**
     * Wrap videos
     */
    protected _processVideos () {
        const parentClassName = `${tagName}__video`;

        const elements = selectAll('video', this);
        elements.forEach((el) => {
            const parent = el.parentElement;
            if (!parent.classList.contains(parentClassName)) {
                const outer = createElement('div', {
                    class: parentClassName,
                });
                insertAfter(outer, el);
                outer.appendChild(el);
            }
        });
    }

    /**
     * Wrap images
     */
    protected _processImages () {
        const parentClassName = `${tagName}__image`;

        const elements = selectAll('img', this);
        elements.forEach((el) => {
            if (
                el.getAttribute('style') == null
                && el.getAttribute('width') == null
                && el.getAttribute('height') == null
                && el.getAttribute('align') == null
            ) {
                const parent = el.parentElement;
                if (!parent.classList.contains(parentClassName)) {
                    const outer = createElement('div', {
                        class: parentClassName,
                    });
                    insertAfter(outer, el);
                    outer.appendChild(el);
                }
            }
        });
    }
}
