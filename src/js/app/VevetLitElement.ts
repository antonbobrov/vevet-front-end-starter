import {
    LitElement,
} from 'lit-element';
import { OnPageCreated } from './OnPageCreated';
import { updateThingsCallbacks } from './updateThings';



export abstract class VevetLitElement extends LitElement {

    protected _onPageCreated: false | OnPageCreated = false;
    protected _disconnected = false;
    protected _updateThingsCallback: string | false;



    createRenderRoot () {
        return this;
    }

    connectedCallback () {
        super.connectedCallback();
        this._disconnected = false;
        this._onPageCreated = new OnPageCreated(() => {
            this._connectedCallback();
        });
        this._updateThingsCallback = updateThingsCallbacks.on('', () => {
            this._updateThings();
        });
    }

    disconnectedCallback () {
        super.disconnectedCallback();
        this._disconnected = true;
        if (this._onPageCreated) {
            this._onPageCreated.destroy();
            this._onPageCreated = false;
        }
        if (this._updateThingsCallback) {
            updateThingsCallbacks.remove(this._updateThingsCallback);
            this._updateThingsCallback = false;
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



    /**
     * Update things
     */
    protected _updateThings () {

    }



}
