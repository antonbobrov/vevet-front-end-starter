import { Plugin, merge, ScrollModule } from 'vevet';


export namespace IScrollClampPlugin {

    export interface Properties extends Plugin.Properties {
        on?: boolean;
        reduce?: number;
        max?: number;
        maxClamp?: number;
    }

    export interface Element extends HTMLElement {
        propCenter: number[];
    }

}


/**
 * This plugin calculates the location of elements in the viewport,
 * based on which the elements either approach each other or move away from each other.
 */
export class ScrollClampPlugin extends Plugin {

    protected _prop: IScrollClampPlugin.Properties;
    protected _m: ScrollModule;

    protected _centerProp: string;

    protected _intensityId: string | false;
    protected _intensity: number;

    protected _prevValues: number[];



    constructor (data: IScrollClampPlugin.Properties) {
        super(data);
    }

    // @ts-ignore
    get defaultProp (): IScrollClampPlugin.Properties {
        return merge(super.defaultProp, {
            on: true,
            reduce: 0.05,
            max: 15,
            maxClamp: 100,
        });
    }

    get prefix () {
        return `${this._v.prefix}scroll-clamp`;
    }



    changeProp (prop: IScrollClampPlugin.Properties) {
        super.changeProp(prop);
    }

    // When properties are changed
    protected _changeProp () {

        super._changeProp();

        // set intensity event
        this._intensitySet();

    }



    // Extra Constructor
    protected _extra () {

        super._extra();

        // get module
        const module = this._m;

        // override module element properties
        // @ts-ignore
        const _elProp = module._elProp.bind(module);
        // @ts-ignore
        module._elProp = () => {
            _elProp();
            if (this._prop.on) {
                this._forceValues();
                this._elProp();
            }
        };
        // @ts-ignore
        module._elProp();

        // intensity on render
        this._intensityId = false;
        this._intensitySet();

        // override get ease
        this._overrideGetEase();

        // override elements' values calculations
        this._calcElValues();

    }



    /**
     * Set intensity on render.
     */
    protected _intensitySet () {

        // get module
        const module = this._m;

        // remove prev event
        if (this._intensityId) {
            module.remove(this._intensityId);
            this._intensityId = false;
        }

        // update intensity values
        this._intensity = 0;
        this._updateTargets();

        // set new event
        if (this._prop.on) {
            this._intensityId = module.on('update', () => {

                // get difference between current and previous targets
                let difference;
                if (module.prop.horizontal) {
                    difference = module.scrollLeft - this._prevValues[0];
                }
                else {
                    difference = module.scrollTop - this._prevValues[1];
                }

                // get intensity
                this._intensity = Math.abs(difference / this._prop.max);
                if (this._intensity > 1) {
                    this._intensity = 1;
                }

                // update targets
                this._updateTargets();

            });
        }

    }

    /**
     * Update previous scroll values.
     */
    protected _updateTargets () {

        // get module
        const module = this._m;

        this._prevValues = [module.scrollLeft, module.scrollTop];

    }



    /**
     * Set element properties.
     */
    protected _elProp () {

        // get module
        const module = this._m;
        // @ts-ignore
        const currentProp = module._properties.current;

        // go thru elements and set properties
        // @ts-ignore
        for (let i = 0; i < module._length; i++) {

            // get element
            const el = module.elements[i] as HTMLElement;
            // @ts-ignore
            const elCurrentProp = el[currentProp] as number[];

            // set center coordinates
            const bounding = el.getBoundingClientRect();
            // @ts-ignore
            const x = bounding.left + elCurrentProp[0] + bounding.width / 2;
            // @ts-ignore
            const y = bounding.top + elCurrentProp[1] + bounding.height / 2;
            // @ts-ignore
            el[this._centerProp] = [x, y];

        }

    }



    /**
     * Force values.
     */
    protected _forceValues () {

        // get module
        const module = this._m;

        // change values
        // @ts-ignore
        for (let i = 0; i < module._length; i++) {

            // get element
            const el = module.elements[i];

            // target and current values
            // @ts-ignore
            const current = el[module._properties.current];

            // change values
            current[0] = module.targetLeft;
            current[1] = module.targetTop;

        }

        // render elements
        // @ts-ignore
        module._render();

    }

    /**
     * Override elements ease.
     */
    protected _overrideGetEase () {

        // get module
        const module = this._m;

        // override
        // @ts-ignore
        const _getEase = module._getEase.bind(module);
        // @ts-ignore
        module._getEase = (el, intstant) => {

            let ease = _getEase(el, intstant);

            // if disabled
            if (!this._prop.on) {
                return ease;
            }
            // if absolute easing
            if (el == null) {
                return ease;
            }

            // center position
            let centerPos = 0;
            let p = 0;
            // @ts-ignore
            const centerProp = el[this._centerProp];
            // @ts-ignore
            const currentProp = module._properties.current;

            // calculate progress values
            if (module.prop.horizontal) {
                // @ts-ignore
                centerPos = centerProp[0] - el[currentProp][0];
                p = centerPos / module.width;
            }
            else {
                // @ts-ignore
                centerPos = centerProp[1] - el[currentProp][1];
                p = centerPos / module.height;
            }

            // get progress according to durection
            // @ts-ignore
            if (module._direction < 0) {
                p = 1 - p;
            }

            // scope progress value
            const moduleEase = module.prop.ease;
            if (p < -moduleEase) {
                p = -moduleEase;
            }
            if (p > moduleEase + 1) {
                p = moduleEase + 1;
            }

            // reduce easing
            ease -= p * this._prop.reduce * this._intensity;

            return ease;

        };

    }

    /**
     * Override elements' values calculation.
     */
    protected _calcElValues () {

        // get module
        const module = this._m;

        // override
        const _calcElValues = module._calcElValues.bind(module);
        module._calcElValues = (intstant) => {

            _calcElValues(intstant);

            // @ts-ignore
            for (let i = 0; i < module._length; i++) {

                // get element
                const el = module.elements[i];

                // target and current values
                // @ts-ignore
                const current = el[module._properties.current];

                // bound values
                this._boundClamping(current);

            }

        };

    }

    /**
     * Bound Clamping.
     */
    protected _boundClamping (current: number[]) {

        // get module
        const module = this._m;

        // get max clamping
        const max = this._prop.maxClamp;

        // bound top
        if (current[1] > module.scrollTop + max) {
            current[1] = module.scrollTop + max;
        }
        if (current[1] < module.scrollTop - max) {
            current[1] = module.scrollTop - max;
        }

    }



}
