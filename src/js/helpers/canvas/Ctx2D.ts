import { createElement } from 'vevet-dom';
import app from '../../app/app';

const { viewport } = app;



export default class Ctx2D {
    protected _canvas: HTMLCanvasElement;
    get canvas () {
        return this._canvas;
    }

    protected _ctx: CanvasRenderingContext2D;
    get ctx () {
        return this._ctx;
    }

    protected _width = 0;
    get width () {
        return this._width;
    }

    protected _height = 0;
    get height () {
        return this._height;
    }

    protected _dpr = 1;
    get dpr () {
        return this._dpr;
    }



    constructor (
        protected _parent: Element | false,
        /**
         * true - real DPR, false - dprMobile, or just a number
         */
        protected _useDpr: boolean | number = false,
    ) {
        this._create();
    }

    protected _create () {
        this._canvas = createElement('canvas');
        this._ctx = this._canvas.getContext('2d');
    }

    public updateSize (
        width?: number,
        height?: number,
    ) {
        let dpr = 1;
        if (typeof this._useDpr === 'boolean') {
            if (this._useDpr) {
                dpr = viewport.dpr;
            } else {
                dpr = viewport.dprMobile;
            }
        } else {
            dpr = this._useDpr;
        }
        this._dpr = dpr;

        let newWidth = 0;
        let newHeight = 0;

        if (!!width && !!height) {
            newWidth = width;
            newHeight = height;
        } else if (this._parent) {
            newWidth = this._parent.clientWidth * dpr;
            newHeight = this._parent.clientHeight * dpr;
        } else {
            newWidth = viewport.size[0] * dpr;
            newHeight = viewport.size[1] * dpr;
        }

        this._width = newWidth;
        this._height = newHeight;

        this._canvas.width = newWidth;
        this._canvas.height = newHeight;
    }
}
