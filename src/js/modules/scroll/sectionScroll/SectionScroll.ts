import {
    Module, FrameModule, merge, timeoutCallback, normalizeWheel, mathScopeProgress,
} from 'vevet';
import { selectOne, selectAll } from 'vevet-dom';

const lerp = require('lerp');



export namespace ISectionScroll {

    export interface Prop extends Module.Properties {
        selectors?: {
            outer?: string | HTMLElement;
            elements?: string | HTMLElement | NodeList | HTMLElement[];
        };
        run?: boolean;
        frame?: false | FrameModule | Module;
        resizeOnUpdate?: boolean;
        resizeTimeout?: number;
        scroll?: boolean;
        autoStop?: boolean;
        horizontal?: boolean,
        ease?: number;
        propagation?: boolean;
        willChange?: boolean;
        round?: boolean;
        useTransform?: true;
    }

    export interface El extends HTMLElement {
        sectionScroll: ElProp
    }

    export interface ElProp {
        boundingRect?: {
            top: number;
            left: number;
            width: number;
            height: number;
        };
        scrollBounding?: {
            x: ScopeCoords
            y: ScopeCoords
        };
        coords?: {
            current: Coords;
            target: Coords;
        };
        callbackState?: CallbacksState;
        callbacks?: Callbacks | false;
        needToBeRendered?: boolean;
    }

    export interface Coords {
        x: number;
        y: number;
    }

    export interface ScopeCoords {
        min: number;
        max: number;
    }

    export interface CallbacksState {
        in: boolean;
        zeroAppear: boolean;
        fullAppear: boolean;
        zeroDisappear: boolean;
        fullDisappear: boolean;
        out: boolean;
    }

    export interface Callbacks {
        in?: Function;
        line?: Callback;
        appear?: Callback;
        move?: Callback;
        disappear?: Callback;
        out?: Function;
    }

    export type Callback = (progress: number) => void;

}



export class SectionScroll extends Module {


    // eslint-disable-next-line no-useless-constructor
    constructor (data: ISectionScroll.Prop) {
        super(data);
    }

    get prefix () {
        return `${this._v.prefix}scroll`;
    }



    // @ts-ignore
    get defaultProp (): ISectionScroll.Prop {
        const prefix = this._prefix;
        const prop: ISectionScroll.Prop = {
            selectors: {
                outer: `.${prefix}`,
                elements: `.${prefix}__el`,
            },
            run: true,
            frame: false,
            resizeOnUpdate: true,
            resizeTimeout: 0,
            scroll: true,
            autoStop: true,
            horizontal: false,
            ease: 0.1,
            propagation: false,
            willChange: false,
            round: false,
            useTransform: true,
        };
        return merge(super.defaultProp, prop);
    }

    protected _prop: ISectionScroll.Prop;
    // @ts-ignore
    get prop (): ISectionScroll.Prop {
        return this._prop;
    }

    changeProp (prop: ISectionScroll.Prop) {
        super.changeProp(prop);
    }



    protected _outer: Element;
    get outer () {
        return this._outer;
    }

    protected _container: HTMLElement;

    protected _length: number;
    protected _el: ISectionScroll.El[];
    get elements () {
        return this._el;
    }



    protected _width: number;
    protected _height: number;
    get sizes () {
        return [this._width, this._height];
    }

    get scrollWidth () {
        return this._width;
    }

    get scrollHeight () {
        return this._height;
    }

    protected _widthOuter: number;
    protected _heightOuter: number;
    get outerSizes () {
        return [this._widthOuter, this._heightOuter];
    }
    get width () {
        return this._widthOuter;
    }
    get height () {
        return this._heightOuter;
    }



    protected _instant: boolean;

    protected _targetLeft: number;
    get targetLeft () {
        return this._targetLeft;
    }
    set targetLeft (value) {
        this._targetLeft = value;
        this.play();
    }

    protected _targetTop: number;
    get targetTop () {
        return this._targetTop;
    }
    set targetTop (value) {
        this._targetTop = value;
        this.play();
    }

    protected _scrollTop: number;
    get scrollTop () {
        return this._scrollTop;
    }
    set scrollTop (value) {
        this._targetTop = value;
        this._boundaries(true);
        this._instant = true;
        this.play();
    }

    protected _scrollLeft: number;
    get scrollLeft () {
        return this._scrollLeft;
    }
    set scrollLeft (value) {
        this._targetLeft = value;
        this._boundaries(false);
        this._instant = true;
        this.play();
    }

    set scrollValues (coord: number[]) {
        [this._targetLeft, this._targetTop] = coord;
        this._boundaries(false);
        this._boundaries();
        this._instant = true;
        this.play();
    }



    protected _frame: any;



    // Extra Constructor
    protected _extra () {

        super._extra();

        // const prefix = this._prefix;

        // /**
        //  * Element properties.
        //  * @member {object}
        //  * @protected
        //  */
        // this._properties = {
        //     current: `${prefix}-current`,
        //     ease: `${prefix}-ease`,
        // };

        // what scroll values must be
        this._targetTop = 0;
        this._targetLeft = 0;

        // scroll top & scroll left current values
        this._scrollTop = 0;
        this._scrollLeft = 0;

        /**
         * If the change of the scroll values must happen without interpolation
         */
        this._instant = false;

        /**
         * Container width
         */
        this._width = 1;
        /**
         * Container height
         */
        this._height = 1;

        /**
         * Outer width
         */
        this._widthOuter = 1;
        /**
         * Outer height
         */
        this._heightOuter = 1;

        /**
         * Animation frame
         */
        this._frame = false;

        // get elements
        this._getElements();
        // create additional scrolling elements
        this._createAdditionalElements();

    }

    // Initialize & Run animation frame
    protected _init () {
        super._init();
        this._run();
    }

    // When properties are changed
    // @ts-ignore
    protected _changeProp (prop: ISectionScroll.Prop) {

        // @ts-ignore
        super._changeProp(prop);

        // update elements
        this._getElements();
        this.setSize();
        this._run();

    }



    /**
     * Get elements. Scroll elements are searched not only inside the outer.
     */
    protected _getElements () {

        // copy values
        const prop = this._prop;
        const { selectors } = prop;

        this._outer = selectOne(selectors.outer);
        this._outer.classList.add(this._prefix);

        this._el = selectAll(selectors.elements) as ISectionScroll.El[];
        const el = this._el;
        this._length = el.length;

        // apply will change
        let willChangeValue = '';
        if (prop.willChange) {
            willChangeValue = 'transform';
        }
        for (let i = 0; i < el.length; i++) {
            el[i].style.willChange = willChangeValue;
        }

    }

    /**
     * Set element properties.
     */
    protected _setElementsProp () {

        for (let i = 0; i < this._length; i++) {

            const el = this._el[i];

            // get & set dedault settings
            let settings = el.sectionScroll;
            if (!settings) {
                settings = SectionScroll.setDefaultElProp(el);
            }

            // set current scroll values
            settings.coords = {
                target: {
                    x: this._scrollLeft,
                    y: this.scrollTop,
                },
                current: {
                    x: this._scrollLeft,
                    y: this.scrollTop,
                },
            };

            // set section bounding rect
            const bounding = el.getBoundingClientRect();
            settings.boundingRect = {
                top: bounding.top + this._scrollTop,
                left: bounding.left + this._scrollLeft,
                width: bounding.width,
                height: bounding.height,
            };
            const { boundingRect } = settings;

            // set bound scroll values
            settings.scrollBounding = {
                y: {
                    min: boundingRect.top - this._heightOuter,
                    max: boundingRect.top + bounding.height,
                },
                x: {
                    min: boundingRect.left - this._widthOuter,
                    max: boundingRect.left + bounding.width,
                },
            };

            // set callbacks state
            settings.callbackState = {
                in: false,
                zeroAppear: false,
                fullAppear: false,
                zeroDisappear: false,
                fullDisappear: false,
                out: false,
            };

            // create callbacks
            if (!settings.callbacks) {
                settings.callbacks = {};
            }

        }

    }

    /**
     * Set default properties for an element
     */
    public static setDefaultElProp (
        el: ISectionScroll.El,
    ) {

        // if the elements need to be rendered
        const noRenderAttribute = el.getAttribute('data-no-render');

        // get settings
        let settings = el.sectionScroll;
        if (!settings) {
            el.sectionScroll = {
                needToBeRendered: !noRenderAttribute,
                callbacks: {},
            };
            settings = el.sectionScroll;
        }

        return el.sectionScroll;

    }

    /**
     * Create additional elements. They are needed for scrolling.
     */
    protected _createAdditionalElements () {

        this._container = document.createElement('div');
        this._container.classList.add(`${this._prefix}__container`);

        // move elements
        while (this._outer.firstChild) {
            this._container.appendChild(this._outer.firstChild);
        }

        // append additional elements
        this._outer.appendChild(this._container);

    }



    // Set Events
    protected _setEvents () {

        // sizes
        this.setSize();
        this.addEvent('viewport', {
            target: '',
            name: this.name,
            do: () => {
                timeoutCallback(() => {
                    this.setSize(true);
                }, this._prop.resizeTimeout);
            },
        });

        // wheel events
        this.addEventListener({
            el: this._outer,
            target: 'wheel',
            do: this._wheel.bind(this),
            passive: true,
        });

        // events on scroll
        this.addEventListener({
            el: this._outer,
            target: 'scroll',
            do: this._onScroll.bind(this),
            passive: true,
        });

    }



    /**
     * Update size values.
     * @param {boolean} native - Defines if the method was called on window resize.
     */
    public setSize (native = false) {

        if (!this._prop.run) {
            return;
        }

        // elements
        const container = this._container;
        const outer = this._outer;

        // get sizes
        this._width = container.clientWidth;
        this._height = container.clientHeight;
        this._widthOuter = outer.clientWidth;
        this._heightOuter = outer.clientHeight;

        // bound height and widths
        if (this._width < this._widthOuter) {
            this._width = this._widthOuter;
        }
        if (this._height < this._heightOuter) {
            this._height = this._heightOuter;
        }

        // force change
        // it means that after resizing scrolling will be instantaneous for a while
        if (native) {
            this._instant = true;
        }

        // sometimes after resizing it may happen that targets are less or more
        // eslint-disable-next-line no-irregular-whitespace
        // than maximum values ​​of scrolling
        // that's why we check it out here and fix it
        if (native) {
            this._boundaries(false);
            this._boundaries(true);
        }

        // change element properties
        this._setElementsProp();

        // launch callbacks
        this.lbt('size');

    }



    /**
     * Event on wheel.
     */
    protected _wheel (evt: WheelEvent) {

        const prop = this._prop;

        if (prop.run && prop.scroll) {

            // stop propagation if enabled
            if (!prop.propagation) {
                // evt.preventDefault();
                evt.stopPropagation();
            }

            // get normalized delta
            const delta = normalizeWheel(evt);

            // set new scroll targets
            let x = delta.pixelX;
            let y = delta.pixelY;
            if (prop.horizontal) {
                x = delta.pixelY;
                y = delta.pixelX;
            }
            this.targetLeft += x;
            this.targetTop += y;

            // shrink target values
            this._boundaries(false);
            this._boundaries(true);

            // play scroll
            this.play();

            // launch events
            this.lbt('wheel', evt);

        }

    }

    /**
     * Event on scroll. Reset native scroll values.
     */
    protected _onScroll () {

        const prop = this._prop;

        if (prop.run) {
            this._outer.scrollTop = 0;
            this._outer.scrollLeft = 0;
        }

    }



    /**
     * Prevent cases when targets are less or more than the maximum values of scrolling
     */
    protected _boundaries (vertical = true) {

        const targetTop = this._targetTop;
        const targetLeft = this._targetLeft;

        // check cases
        if (vertical) {
            const max = this._height - this._heightOuter;
            if (targetTop < 0) {
                this.targetTop = 0;
            }
            if (targetTop > max) {
                this.targetTop = max;
            }
        }
        else {
            const max = this._width - this._widthOuter;
            if (targetLeft < 0) {
                this.targetLeft = 0;
            }
            if (targetLeft > max) {
                this.targetLeft = max;
            }
        }

    }

    /**
     * The same as {@linkcode Vevet.ScrollModule._boundaries} but for both axis.
     */
    protected _boundariesBoth () {
        this._boundaries(false);
        this._boundaries();
    }



    /**
     * Run animationFrame.
     */
    protected _run () {

        if (this._prop.run) {
            this.play();
        }
        else {
            this.stop();
        }

    }

    /**
     * Run animation frame if scroll is enabled.
     */
    public play () {

        const frame = this._frame;

        if (!frame && this._prop.run) {
            if (this._prop.frame) {
                this._frame = this._prop.frame.on('frame', this.render.bind(this));
            }
            else {
                this._frame = window.requestAnimationFrame(this.render.bind(this));
            }
        }

    }

    /**
     * Stop animation frame. Though it will restart on the wheel event.
     * To stop scroll forever use {@linkcode Vevet.ScrollModule.changeProp}.
     */
    stop () {

        const frame = this._frame;

        if (frame) {
            if (this._prop.frame) {
                this._prop.frame.remove(this._frame);
            }
            else {
                window.cancelAnimationFrame(frame);
            }
            this._frame = false;
        }

    }



    /**
     * Animation. Here scroll values are calculated.
     */
    public render () {

        // auto-resizing
        this._autoResize();

        // instant scroll after resizing
        let instant = false;
        if (this._instant) {
            instant = true;
            this._instant = false;
        }

        // calculate scroll values: scrollLeft & scrollTop
        this._calcScrollCoords(instant);

        // change elements' values
        this._calcElCoords(instant);

        // render
        this._render();

        // event
        this.lbt('update', {
            left: this._scrollLeft,
            top: this._scrollTop,
        });

        // animation frame
        if (!this._prop.frame) {
            this._frame = window.requestAnimationFrame(this.render.bind(this));
        }

        // stop frame if values are interpolated
        const yDiff = Math.abs(this._targetTop - this._scrollTop);
        const xDiff = Math.abs(this._targetLeft - this._scrollLeft);
        if (yDiff < 0.01 && xDiff < 0.01) {
            if (this._prop.autoStop) {
                this.stop();
            }
            this.lbt('approximate');
        }

    }

    /**
     * Auto-resizing while rendering.
     */
    _autoResize () {

        // get prop
        const prop = this._prop;
        const container = this._container;

        // auto resize
        if (prop.resizeOnUpdate) {
            const height = container.clientHeight;
            const width = container.clientWidth;
            if ((height !== this._height) || (width !== this._width)) {
                this.setSize();
            }
        }

    }

    /**
     * Calculate elements' values.
     * @param {boolean} instant - If animation is to be implemented instantly.
     */
    _calcElCoords (instant: boolean) {

        for (let i = 0; i < this._length; i++) {

            // get element & props
            const el = this._el[i];
            const { sectionScroll } = el;
            const { coords } = sectionScroll;

            // get ease
            const ease = this.getEase(el, instant);

            // change values
            const targetCoords = coords.target;
            if (ease === this._prop.ease) {
                targetCoords.x = this._scrollLeft;
                targetCoords.y = this._scrollTop;
            }
            else {
                targetCoords.x = this._r(lerp(targetCoords.x, this._targetLeft, ease));
                targetCoords.y = this._r(lerp(targetCoords.y, this._targetTop, ease));
                // round the values
                if (this._prop.round) {
                    targetCoords.x = Math.round(targetCoords.x);
                    targetCoords.y = Math.round(targetCoords.y);
                }
            }

        }

    }

    /**
     * Calculate scroll values: scrollLeft & scrollTop.
     * @param {boolean} instant - If animation is to be implemented instantly.
     */
    protected _calcScrollCoords (instant: boolean) {

        // get ease
        const ease = this.getEase(null, instant);

        // change values
        this._scrollLeft = this._r(lerp(this._scrollLeft, this._targetLeft, ease));
        this._scrollTop = this._r(lerp(this._scrollTop, this._targetTop, ease));

        // round the values
        if (this._prop.round) {
            this._scrollLeft = Math.round(this._scrollLeft);
            this._scrollTop = Math.round(this._scrollTop);
        }

    }

    protected _r (t: number, e?: any) {

        /* eslint-disable */
        return e = void 0 !== e ? Math.pow(10, e) : 1e3,
            Math.round(t * e) / e;

    }

    /**
     * Get elements ease.
     */
    public getEase(el: HTMLElement | null, instant: boolean) {

        if (instant) {
            return 1;
        }
        if (el == null) {
            return this._prop.ease;
        }

        return this._prop.ease;


    }

    public _getEase(el: HTMLElement | null, instant: boolean) {
        return this.getEase(el, instant)
    }



    /**
     * Render elements, transforms.
     */
    protected _render() {

        // through all elements
        for (let i = 0; i < this._length; i++) {

            const el = this._el[i];
            const { sectionScroll } = el;
            const { coords } = sectionScroll;
            const targetCoords = coords.target;
            const currentCoords = coords.current;

            // define if we need to tranform the elements
            const renderingData = this._proceedElRenderingData(el);

            // and transform the element only when needed
            if (renderingData.needToBeRendered) {

                // get "must-be" coordinates
                const x = -targetCoords.x;
                const y = -targetCoords.y;
                // set styles
                if (this._prop.useTransform) {
                    el.style.transform = `
                        matrix3d(1,0,0.00,0,0.00,1,0.00,0,0,0,1,0, ${x}, ${y}, 0,1)
                    `;
                }
                else {
                    el.style.left = `${x}px`;
                    el.style.top = `${y}px`;
                }

            }

            // and now we can update current coordinates
            currentCoords.x = targetCoords.x;
            currentCoords.y = targetCoords.y;

        }

    }

    protected _proceedElRenderingData(
        el: ISectionScroll.El
    ) {

        const { coords, callbacks, callbackState } = el.sectionScroll;
        const currentCoords = coords.current;
        const targetCoords = coords.target;
        const elScrollBounding = el.sectionScroll.scrollBounding;
        const scrollBounding = this._prop.horizontal ? elScrollBounding.x : elScrollBounding.y;

        const targetScrollValue = this._prop.horizontal ? targetCoords.x : targetCoords.y;
        const scrollOuterSize = this._prop.horizontal ? this._widthOuter : this._heightOuter;

        // get line progress for each type of coordinates
        const currentLineProgress = mathScopeProgress(
            this._prop.horizontal ? currentCoords.x : currentCoords.y,
            [scrollBounding.min, scrollBounding.max]
        );
        const targetLineProgress = mathScopeProgress(
            targetScrollValue,
            [scrollBounding.min, scrollBounding.max]
        );

        // proceed appear & disappear callbacks
        this._proceedAppearCallbacks(
            el,
            scrollOuterSize,
            targetScrollValue,
            scrollBounding
        );
        this._proceedDisappearCallbacks(
            el,
            scrollOuterSize,
            targetScrollValue,
            scrollBounding
        );

        // define if need to render
        // let needToBeRendered = false;
        // if (currentLineProgress >= 0 && currentLineProgress <= 1) {
        //     needToBeRendered = true;
        // }
        const needToBeRendered = el.sectionScroll.needToBeRendered;

        // and in/out callbacks proceed
        if (targetLineProgress >= 0 && targetLineProgress <= 1) {

            // and launch line callbacks
            if (callbacks) {
                if (callbacks.line) {
                    callbacks.line(targetLineProgress);
                }
            }

            // launch "in" callbacks
            if (callbacks) {
                if (!callbackState.in && !!callbacks.in) {
                    callbacks.in();
                    callbackState.in = true;
                    callbackState.out = false;
                }
            }

        }
        else if (targetLineProgress >= 1 || targetLineProgress <= 0) {

            // launch "out" callbacks
            if (callbacks) {
                if (!callbackState.out && !!callbacks.out) {
                    callbacks.out();
                    callbackState.out = true;
                    callbackState.in = false;
                }
            }

        }

        // other callbacks
        // this._proceedAppearCallbacks(
        //     el,
        //     scrollOuterSize,
        //     targetScrollValue,
        //     scrollBounding
        // );
        // this._proceedDisappearCallbacks(
        //     el,
        //     scrollOuterSize,
        //     targetScrollValue,
        //     scrollBounding
        // );
        this._proceedMoveCallbacks(
            el,
            scrollOuterSize,
            targetScrollValue,
            scrollBounding
        );

        return {
            needToBeRendered
        };

    }

    protected _proceedAppearCallbacks(
        el: ISectionScroll.El,
        scrollOuterSize: number,
        scrollVal: number,
        scrollBounding: ISectionScroll.ScopeCoords
    ) {

        const { callbacks, callbackState } = el.sectionScroll;

        if (!callbacks) return;
        if (!callbacks.appear) return;

        const progress = mathScopeProgress(
            scrollVal,
            [scrollBounding.min, scrollBounding.min + scrollOuterSize]
        );
        if (
            progress >= 0
            && progress <= 1
        ) {
            callbacks.appear(progress);
            callbackState.zeroAppear = false;
            callbackState.fullAppear = false;
        }
        else if (progress < 0) {
            if (!callbackState.zeroAppear) {
                callbacks.appear(0);
            }
            callbackState.zeroAppear = true;
        }
        else if (progress > 1) {
            if (!callbackState.fullAppear) {
                callbacks.appear(1);
            }
            callbackState.fullAppear = true;
        }

    }

    protected _proceedDisappearCallbacks(
        el: ISectionScroll.El,
        scrollOuterSize: number,
        scrollVal: number,
        scrollBounding: ISectionScroll.ScopeCoords
    ) {

        const { callbacks, callbackState } = el.sectionScroll;

        if (!callbacks) return;
        if (!callbacks.disappear) return;

        const progress = mathScopeProgress(
            scrollVal,
            [scrollBounding.max - scrollOuterSize, scrollBounding.max]
        );
        if (
            progress >= 0
            && progress <= 1
        ) {
            callbacks.disappear(progress);
            callbackState.zeroDisappear = false;
            callbackState.fullDisappear = false;
        }
        else if (progress < 0) {
            if (!callbackState.zeroDisappear && callbackState.fullAppear) {
                callbacks.disappear(0);
            }
            callbackState.zeroDisappear = true;
        }
        else if (progress > 1) {
            if (!callbackState.fullDisappear) {
                callbacks.disappear(1);
            }
            callbackState.fullDisappear = true;
        }

    }

    protected _proceedMoveCallbacks(
        el: ISectionScroll.El,
        scrollOuterSize: number,
        scrollVal: number,
        scrollBounding: ISectionScroll.ScopeCoords
    ) {

        const { callbacks, callbackState } = el.sectionScroll;

        if (!callbacks) return;
        if (!callbacks.move) return;

        const progress = mathScopeProgress(
            scrollVal,
            [
                scrollBounding.min + scrollOuterSize,
                scrollBounding.max - scrollOuterSize
            ]
        );

        if (
            progress >= 0
            && progress <= 1
        ) {
            callbacks.move(progress);
        }

    }



    /**
     * Destroy the scroll.
     */
    destroy() {

        super.destroy();

        // stop frame
        this._prop.run = false;
        this._run();

        // vars
        const container = this._container;
        const { children } = container;
        const outer = this._outer;

        // children
        for (let i = 0; i < children.length; i++) {
            outer.appendChild(children[i]);
        }

        // remove elements
        outer.removeChild(container);

        // classes
        outer.classList.remove(this._prefix);

        // styles
        for (let i = 0; i < this._el.length; i++) {
            const el = this._el[i];
            el.style.transform = "";
            el.style.willChange = "";
        }

    }



}
