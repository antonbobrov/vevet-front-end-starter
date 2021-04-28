import { DefaultPage } from '../pages/list/default-page';
import app from './app';

export class OnPageCreated {

    protected _proceeded = false;
    protected _timeout: false | NodeJS.Timeout = false;

    constructor (
        protected _callback: () => void,
    ) {
        this._trace();
    }

    protected _trace () {
        if (this._proceeded) {
            return;
        }
        const page = app.vevetPage as DefaultPage;
        if (!!page && page.pageCreated) {
            this._proceeded = true;
            this._callback();
        }
        else {
            this._timeout = setTimeout(() => {
                this._trace();
            }, 50);
        }
    }

    public destroy () {
        if (this._timeout) {
            clearTimeout(this._timeout);
        }
    }

}
