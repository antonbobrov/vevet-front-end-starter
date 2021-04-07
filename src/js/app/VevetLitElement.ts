import {
    LitElement,
} from 'lit-element';
import { OnPageCreated } from './OnPageCreated';



export abstract class VevetLitElement extends LitElement {

    protected _onPageCreated: false | OnPageCreated = false;



    createRenderRoot () {
        return this;
    }

    connectedCallback () {
        super.connectedCallback();
        this._onPageCreated = new OnPageCreated(() => {
            this._connectedCallback();
        });
    }

    disconnectedCallback () {
        super.disconnectedCallback();
        if (this._onPageCreated) {
            this._onPageCreated.destroy();
            this._onPageCreated = false;
        }
        this._disconnectedCallback();
    }



    /**
     * Connected callback
     */
    protected _connectedCallback () {

    }

    /**
     * Disconnected callback
     */
    protected _disconnectedCallback () {

    }



}
